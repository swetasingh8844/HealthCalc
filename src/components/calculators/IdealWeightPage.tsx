import React from "react";
import { Helmet } from "react-helmet-async";
import { IdealWeightCalculator } from "./IdealWeightCalculator";

export const IdealWeightPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Ideal Weight Calculator - Find Your Healthy Body Weight</title>
        <meta
          name="description"
          content="Find your ideal body weight using our accurate calculator."
        />
        <link rel="canonical" href="https://thefitcalculator.com/ideal-weight-calculator" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <IdealWeightCalculator />
      </div>
    </>
  );
};
