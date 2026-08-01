"use client";

import React, { useCallback, useState } from "react";
import copy from "copy-to-clipboard";
import { useToast } from "../toast/ToastProvider";

import Image from "next/image";

interface AccountProps {
  name: string;
  bankInfo: {
    bankName: "BCA" | "Mandiri" | string;
    accountNumber: string;
  };
}

const Account = ({ name, bankInfo }: AccountProps) => {
  const { show } = useToast();
  const [copied, setCopied] = useState(false);

  const cleanNumber = bankInfo.accountNumber.replace(/[^0-9]/g, "");

  const handleAccountCopy = useCallback(() => {
    copy(cleanNumber);
    setCopied(true);
    show("Nomor Rekening berhasil disalin");
    setTimeout(() => setCopied(false), 2000);
  }, [cleanNumber, show]);

  // Format 4-digit groups for ATM card display
  const formattedNumber = cleanNumber.match(/.{1,4}/g)?.join(" ") || cleanNumber;

  const isBCA = bankInfo.bankName.toUpperCase().includes("BCA");

  return (
    <div
      className={`w-full rounded-2xl p-5 relative overflow-hidden shadow-xl text-white transition-all duration-300 transform hover:-translate-y-0.5 my-2 ${isBCA
        ? "bg-gradient-to-br from-[#0c2340] via-[#103057] to-[#08182b] border border-blue-400/20"
        : "bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617] border border-amber-400/20"
        }`}
    >
      {/* Background Holographic Glow effect */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header: Chip & Bank Logo */}
      <div className="flex items-center justify-between mb-6 z-10 relative">
        {/* EMV Metallic Chip */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 p-[1.5px] shadow-md border border-amber-300/80 flex items-center justify-center">
            <div className="w-full h-full border border-amber-700/40 rounded-[3px] grid grid-cols-2 gap-[1px] opacity-75">
              <div className="border-r border-b border-amber-800/40" />
              <div className="border-b border-amber-800/40" />
              <div className="border-r border-amber-800/40" />
              <div />
            </div>
          </div>
          {/* Contactless Icon */}
          <svg
            className="w-5 h-5 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.464 15.536a5 5 0 010-7.072m3.536 10.607a10 10 0 010-14.142m3.536 17.678a15 15 0 010-21.214"
            />
          </svg>
        </div>

        {/* Bank Brand Logo Image */}
        <div className="relative h-8 w-24 flex items-center justify-end">
          <Image
            unoptimized
            src={isBCA ? "/bca.png" : "/mandiri.png"}
            alt={bankInfo.bankName}
            width={90}
            height={32}
            style={{ width: "auto", height: "auto" }}
            className="object-contain max-h-8 filter drop-shadow-xs"
          />
        </div>
      </div>

      {/* Account Number (Embossed Card Number Style) */}
      <div className="mb-5 z-10 relative">
        <div className="text-11pxr font-semibold uppercase tracking-widest text-white/70 mb-1">
          Account Number
        </div>
        <div className="font-mono text-18pxr medium:text-20pxr font-bold tracking-widest text-white drop-shadow-md select-all">
          {formattedNumber}
        </div>
      </div>

      {/* Footer: Cardholder Name & Copy Button */}
      <div className="flex items-end justify-between z-10 relative pt-2 border-t border-white/10">
        <div>
          <div className="text-9pxr font-semibold uppercase tracking-widest text-white/60">
            Cardholder
          </div>
          <div className="font-bold text-13pxr uppercase tracking-wider text-white drop-shadow-xs max-w-[200px] truncate">
            {name}
          </div>
        </div>

        {/* Salin Button */}
        <button
          onClick={handleAccountCopy}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-12pxr font-bold shadow-md transition-all duration-200 active:scale-95 cursor-pointer ${copied
            ? "bg-emerald-500 text-white"
            : "bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30"
            }`}
          aria-label={`Salin nomor rekening ${bankInfo.bankName} ${name}`}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Tersalin</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Salin</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Account;
