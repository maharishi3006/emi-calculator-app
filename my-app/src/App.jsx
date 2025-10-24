import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // State variables for inputs
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');

  // State variables for results
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [displayLoanAmount, setDisplayLoanAmount] = useState(null);

  /**
   * Handles the EMI calculation logic.
   */
  const handleCalculateEMI = () => {
    // Convert inputs to numbers
    const P = parseFloat(loanAmount);
    const AnnualRate = parseFloat(interestRate);
    const N = parseFloat(loanTenure);

    // --- Input Validation ---
    if (isNaN(P) || isNaN(AnnualRate) || isNaN(N) || P <= 0 || AnnualRate <= 0 || N <= 0) {
      alert("Please enter valid positive numbers for all fields.");
      return; // Stop the function if validation fails
    }

    // --- Calculation ---
    // Calculate monthly interest rate [cite: 113]
    const R = AnnualRate / 12 / 100;
    
    // Check if rate is zero to avoid division by zero
    if (R === 0) {
        setEmi((P / N).toFixed(2));
        setTotalInterest('0.00');
        setDisplayLoanAmount(P.toFixed(2));
        return;
    }

    // Calculate EMI using the formula [cite: 110]
    const emiNumerator = P * R * Math.pow(1 + R, N);
    const emiDenominator = Math.pow(1 + R, N) - 1;
    const calculatedEmi = emiNumerator / emiDenominator;

    const totalAmountPayable = calculatedEmi * N;
    const calculatedTotalInterest = totalAmountPayable - P;

    // --- Update State to Display Results ---
    setEmi(calculatedEmi.toFixed(2));
    setTotalInterest(calculatedTotalInterest.toFixed(2));
    setDisplayLoanAmount(P.toFixed(2));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">EMI Calculator  🧮</h2>
          
          {/* Input Form */}
          <div className="mb-3">
            <label htmlFor="loanAmount" className="form-label">Loan Amount (₹)</label>
            <input
              type="number"
              className="form-control"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="e.g., 100000"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="interestRate" className="form-label">Annual Interest Rate (%)</label>
            <input
              type="number"
              className="form-control"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 8.5"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="loanTenure" className="form-label">Loan Tenure (in months)</label>
            <input
              type="number"
              className="form-control"
              id="loanTenure"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              placeholder="e.g., 120"
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary" onClick={handleCalculateEMI}>
              Calculate EMI
            </button>
          </div>
          
          {/* Results Display */}
          {emi !== null && (
            <div className="mt-4 p-3 bg-light rounded">
              <h4 className="text-center">Loan Details</h4>
              <p><strong>Loan Amount:</strong> ₹ {displayLoanAmount}</p>
              <p><strong>Equated Monthly Instalment (EMI):</strong> ₹ {emi}</p>
              <p><strong>Total Interest to be Paid:</strong> ₹ {totalInterest}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;