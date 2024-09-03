"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";

import Nav from "./Navigation/page";
import Home from "./Home/page";
import PriceOracle from "./PriceOracle/page";
import CollateralManager from './CollateralManager/page';
import LendingPool from './LendingPool/page';
import Borrower from './Borrower/page';
import InterestRate from './InterestRate/page';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./provider.css";

import { getConfig } from "@/wagmi";

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>

      <Router>
        <Nav />
        <QueryClientProvider client={queryClient}>
          {/* {props.children} */}
         
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/priceOracle" element={<PriceOracle />} />
            <Route path="/collateralManager" element={<CollateralManager />} />
            <Route path="/lendingPool" element={<LendingPool />} />
            <Route path="/borrower" element={<Borrower />} />
            <Route path="/interestRate" element={<InterestRate />} />

          </Routes>

        </QueryClientProvider>
      </Router>

    </WagmiProvider>
  );
}
