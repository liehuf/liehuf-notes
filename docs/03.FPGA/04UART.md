---
title: FPGA 04.串口通信
date: 2026-02-06 22:00:00
permalink: /pages/FPGA_04/
---

本博客用于在学习FPGA的串口通信中做记录，仅作为个人的内化素材

## 一、串口通信的本质

串口通信，本质上就是两根线，一根发，一根收，不过是异步的。

一般的通信数据格式都采用 **10 Bit** 格式，即“1位起始位+8位数据位+1位停止位”。

在用串口接收数据时，需要在硬件内部采用“缓冲器”的方法来规避异步通信中的亚稳态，因为FPGA板子一般和PC或者MCU采用的时钟晶振不一致。

至于发送数据，只需要把10位的数据发送出去，不需要管对方接没接收到，反正已经发送出去了。

## 二、可复用的代码

```verilog
/*
 * 可复用的UART接收模块 (最小版本)
 * 功能：异步串行数据接收，支持8位数据位、1位起始位、1位停止位，无校验
 * 适配：50MHz系统时钟，115200波特率（可通过参数修改）
 */
module uart_rx(
    input           clk,                // 系统时钟
    input           rst_n,              // 低电平复位
    
    input           uart_rxd,           // UART接收引脚
    output reg      uart_rx_finish,     // 一帧数据接收完成标志（高电平有效）
    output reg [7:0]uart_rx_data        // 接收的8位数据
);

// 参数配置（可根据实际需求修改）
parameter SYS_CLK_FREQ = 50_000_000;   // 系统时钟频率
parameter UART_BPS     = 115200;       // UART波特率
localparam BAUD_CNT_MAX = SYS_CLK_FREQ / UART_BPS;  // 波特率计数最大值

// 内部寄存器定义
reg [1:0]  uart_rxd_sync;              // 两级同步寄存器（消抖+亚稳态消除）
reg        work_en;                    // 接收使能标志
reg [3:0]  rx_bit_cnt;                 // 接收bit计数器（0-9：起始位+8数据位+停止位）
reg [15:0] baud_cnt;                   // 波特率计数器
reg [7:0]  rx_data_reg;                // 数据暂存寄存器

// 1. 检测起始位（下降沿）
wire start_flag = uart_rxd_sync[1] & ~uart_rxd_sync[0] & ~work_en;

// 2. 输入信号同步（消除亚稳态）
always @(posedge clk or negedge rst_n) begin
    if(!rst_n)
        uart_rxd_sync <= 2'b11;  // 初始化为高电平（UART空闲状态）
    else
        uart_rxd_sync <= {uart_rxd_sync[0], uart_rxd};
end

// 3. 接收使能控制
always @(posedge clk or negedge rst_n) begin
    if(!rst_n)
        work_en <= 1'b0;
    else if(start_flag)          // 检测到起始位，开启接收
        work_en <= 1'b1;
    else if(rx_bit_cnt == 4'd9 && baud_cnt == BAUD_CNT_MAX/2 - 1)
        work_en <= 1'b0;         // 一帧数据接收完成，关闭接收
end

// 4. 波特率计数器
always @(posedge clk or negedge rst_n) begin
    if(!rst_n)
        baud_cnt <= 16'd0;
    else if(work_en) begin
        baud_cnt <= (baud_cnt < BAUD_CNT_MAX - 1) ? baud_cnt + 1'b1 : 16'd0;
    end else
        baud_cnt <= 16'd0;
end

// 5. 接收bit计数
always @(posedge clk or negedge rst_n) begin
    if(!rst_n)
        rx_bit_cnt <= 4'd0;
    else if(work_en) begin
        rx_bit_cnt <= (baud_cnt == BAUD_CNT_MAX - 1) ? rx_bit_cnt + 1'b1 : rx_bit_cnt;
    end else
        rx_bit_cnt <= 4'd0;
end

// 6. 数据采样（在波特率中间点采样，保证数据稳定）
always @(posedge clk or negedge rst_n) begin
    if(!rst_n)
        rx_data_reg <= 8'd0;
    else if(work_en && (baud_cnt == BAUD_CNT_MAX/2 - 1)) begin
        if(rx_bit_cnt >= 4'd1 && rx_bit_cnt <= 4'd8)  // 采样8位数据位
            rx_data_reg[rx_bit_cnt - 1] <= uart_rxd_sync[1];
    end
end

// 7. 输出数据和完成标志
always @(posedge clk or negedge rst_n) begin
    if(!rst_n) begin
        uart_rx_finish <= 1'b0;
        uart_rx_data   <= 8'd0;
    end else if(rx_bit_cnt == 4'd9 && baud_cnt == BAUD_CNT_MAX/2 - 1) begin
        uart_rx_finish <= 1'b1;    // 拉高完成标志（仅一个时钟周期）
        uart_rx_data   <= rx_data_reg;  // 输出接收的数据
    end else begin
        uart_rx_finish <= 1'b0;
        uart_rx_data   <= uart_rx_data;
    end
end

endmodule
```

```verilog
/*
 * 可复用的UART发送模块 (最小版本)
 * 功能：异步串行数据发送，支持8位数据位、1位起始位、1位停止位，无校验
 * 适配：50MHz系统时钟，115200波特率（可通过参数修改）
 */
module uart_tx(
    input           clk,                // 系统时钟
    input           rst_n,              // 低电平复位
    
    input           uart_tx_req,        // 发送请求（高电平有效）
    input  [7:0]    uart_tx_data,       // 待发送的8位数据
    
    output reg      uart_txd,           // UART发送引脚
    output reg      uart_tx_busy        // 发送忙标志（高电平表示正在发送）
);

// 参数配置（可根据实际需求修改）
parameter SYS_CLK_FREQ = 50_000_000;   // 系统时钟频率
parameter UART_BPS     = 115200;       // UART波特率
localparam BAUD_CNT_MAX = SYS_CLK_FREQ / UART_BPS;  // 波特率计数最大值

// 内部寄存器定义
reg [7:0]  tx_data_reg;                // 发送数据暂存寄存器
reg [3:0]  tx_bit_cnt;                 // 发送bit计数器（0-9：起始位+8数据位+停止位）
reg [15:0] baud_cnt;                   // 波特率计数器

// 1. 数据寄存与发送忙标志控制
always @(posedge clk or negedge rst_n) begin
    if(!rst_n) begin
        tx_data_reg <= 8'd0;
        uart_tx_busy <= 1'b0;
    end else if(uart_tx_req) begin     // 接收到发送请求，锁存数据并置忙
        tx_data_reg <= uart_tx_data;
        uart_tx_busy <= 1'b1;
    end else if(tx_bit_cnt == 4'd9 && baud_cnt == BAUD_CNT_MAX - 1) begin
        tx_data_reg <= 8'd0;
        uart_tx_busy <= 1'b0;          // 一帧数据发送完成，清忙
    end
end

// 2. 波特率计数器
always @(posedge clk or negedge rst_n) begin
    if(!rst_n)
        baud_cnt <= 16'd0;
    else if(uart_tx_req)               // 新请求到来，重置波特计数器
        baud_cnt <= 16'd0;
    else if(uart_tx_busy) begin        // 发送中，波特计数器累加
        baud_cnt <= (baud_cnt < BAUD_CNT_MAX - 1) ? baud_cnt + 1'b1 : 16'd0;
    end else
        baud_cnt <= 16'd0;
end

// 3. 发送bit计数
always @(posedge clk or negedge rst_n) begin
    if(!rst_n)
        tx_bit_cnt <= 4'd0;
    else if(uart_tx_req)               // 新请求到来，重置bit计数器
        tx_bit_cnt <= 4'd0;
    else if(uart_tx_busy) begin        // 发送中，波特计数满则bit计数+1
        tx_bit_cnt <= (baud_cnt == BAUD_CNT_MAX - 1) ? tx_bit_cnt + 1'b1 : tx_bit_cnt;
    end else
        tx_bit_cnt <= 4'd0;
end

// 4. 串行数据发送（起始位+8数据位+停止位）
always @(posedge clk or negedge rst_n) begin
    if(!rst_n)
        uart_txd <= 1'b1;  // 空闲状态为高电平
    else if(uart_tx_busy) begin
        case(tx_bit_cnt)
            4'd0: uart_txd <= 1'b0;    // 发送起始位（低电平）
            4'd1: uart_txd <= tx_data_reg[0];  // 发送第0位数据
            4'd2: uart_txd <= tx_data_reg[1];  // 发送第1位数据
            4'd3: uart_txd <= tx_data_reg[2];  // 发送第2位数据
            4'd4: uart_txd <= tx_data_reg[3];  // 发送第3位数据
            4'd5: uart_txd <= tx_data_reg[4];  // 发送第4位数据
            4'd6: uart_txd <= tx_data_reg[5];  // 发送第5位数据
            4'd7: uart_txd <= tx_data_reg[6];  // 发送第6位数据
            4'd8: uart_txd <= tx_data_reg[7];  // 发送第7位数据
            4'd9: uart_txd <= 1'b1;    // 发送停止位（高电平）
            default: uart_txd <= 1'b1; // 默认空闲状态
        endcase
    end else
        uart_txd <= 1'b1;  // 非发送状态，保持空闲高电平
end

endmodule
```

## 三、串口通信调试建议

在代码和约束无误的情况下，有限检查物理连接的正确性！
