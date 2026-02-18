"use client";

import QRCode from "qrcode";
import { useState } from "react";

export default function QRGenerator() {
  const [table, setTable] = useState("");
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    if (!table) return alert("Enter table number");

    const url = `${window.location.origin}/?table=${table}`;
    const qrData = await QRCode.toDataURL(url);
    setQr(qrData);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Generate Table QR</h1>

      <input
        placeholder="Table No (C4)"
        value={table}
        onChange={(e) => setTable(e.target.value)}
      />

      <button onClick={generateQR}>Generate QR</button>

      {qr && (
        <div>
          <img src={qr} />
          <p>{table}</p>
        </div>
      )}
    </div>
  );
}
