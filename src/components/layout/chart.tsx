"use client";
import React from "react";

export default function ChartSection() {
  return (
    <div className="w-full pt-10 md:pt-24">
      <div className="w-full mx-auto max-w-7xl px-4 md:px-6">
        {/* DexScreener Chart Section */}
        <section className="w-full flex mt-10 mb-10 flex-col items-center justify-center">
          <div className="w-full max-w-4xl">
            <h2 className="font-bold text-[28px] lg:text-[32px] text-center mb-6">
              $CATMOGGY Chart
            </h2>
            <div className="border border-blue-500 shadow-[4px_4px_0_#2b7fff] rounded-xl overflow-hidden">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "125%",
                }}
                className="dexscreener-embed"
              >
                <iframe
                  src="https://dexscreener.com/solana/5Au9vyFPm7CnPyLn6riarodRTQG5Yaya1f5dVBxQZpd4?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    border: 0,
                  }}
                  title="DexScreener Chart"
                />
              </div>
            </div>
            <style jsx>{`
              @media (min-width: 1400px) {
                .dexscreener-embed {
                  padding-bottom: 65%;
                }
              }
            `}</style>
          </div>
        </section>
      </div>
    </div>
  );
}
