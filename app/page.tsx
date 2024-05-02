// @ts-nocheck
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, LineStyle } from 'lightweight-charts';
import axios from 'axios';

export default function Home() {
  const [timeframe, setTimeframe] = useState('1m');
  const [coin, setCoin] = useState('BTCUSDT');
  const chartContainerRef = useRef();
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.bingx.com/v1/kline?symbol=${coin}&interval=${timeframe}`);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#222' },
        textColor: "#DDD"
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" }
      },
      width: chartContainerRef.current.clientWidth,
      height: 701,
      crosshair: {
        vertLine: {
          width: 5,
          style: LineStyle.Solid,
          color: "#C3BCDB44",
          labelbBackgroundColor: "#9B7DFF"
        },
        horzLine: {
          color: "#C3BCDB44",
          labelbBackgroundColor: "#9B7DFF"
        }
      }
    });
    chart.timeScale().fitContent();
    const handleResize = () => {
      chart.applyOptions(
        {
          width: chartContainerRef.current.clientWidth
        }
      )
    };
    window.addEventListener('resize', handleResize)
    const markers = [
      {
        time: 1642427876,
        position: 'belowBar',
        color: 'red',
        shape: 'arrowUp',
        text: 'Sold',
        size: 2
      },
      {
        time: 1642859876,
        position: 'aboveBar',
        color: 'green',
        shape: 'arrowDown',
        text: 'Bought',
        size: 2
      },
    ];
    const candlestickSeries = chart.addCandlestickSeries(
      {
        wickUpColor: "rgb(54,116,217)",
        upColor: "rgb(54,116,217)",
        wickDownColor: "rgb(225,50,85)",
        downColor: "rgb(225, 50, 85)",
        borderVisible: false
      }
    );

    const candlestickData = [
      { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
      { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 },
      { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
      { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
      { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 },
      { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
      { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 },
      { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 },
      { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 },
      { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
      { open: 10.91, high: 12.57, low: 10.71, close: 11.96, time: 1643215476 },
      { open: 10.62, high: 13.57, low: 10.73, close: 10.96, time: 1643215676 },
      { open: 10.90, high: 14.57, low: 10.74, close: 9.96, time: 1643215876 },
      { open: 10.30, high: 15.57, low: 10.76, close: 5.96, time: 1643215976 },
      { open: 10.20, high: 10.57, low: 10.79, close: 17.96, time: 1643216876 },
      { open: 10.57, high: 2.57, low: 10.36, close: 11.92, time: 16432156376 },
      { open: 10.57, high: 1.57, low: 10.36, close: 11.92, time: 16435156376 },
      { open: 10.57, high: 5.57, low: 1.36, close: 11.92, time: 16436156376 },
      { open: 10.57, high: 8.57, low: 5.36, close: 11.92, time: 16437156376 },
      { open: 10.57, high: 10.57, low: 17.36, close: 11.92, time: 16437166376 },
    ];

    candlestickSeries.setData(candlestickData);
    candlestickSeries.setMarkers(markers);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize)
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className='w-full h-screen flex justify-center bg-[#222] overflow-x-hidden overflow-y-hidden'
    />
  );
}
