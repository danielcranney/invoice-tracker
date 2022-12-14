import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { format } from "date-fns";

export default function Home() {
  const [allInvoices, setAllInvoices] = useState([]);
  const [mounted, setMounted] = useState(false);

  const [revenue, setRevenue] = useState(0);
  const [profits, setProfits] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const getInvoices = async () => {
    const response = await fetch(`/api/get-invoices`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    console.log("The data is ", data.invoiceInfo);
    setAllInvoices(data.invoiceInfo);
  };

  const calculateRevenue = () => {
    setRevenue(
      allInvoices
        .filter(
          (invoice) => invoice.type == "revenue" && invoice.status == "paid"
        )
        .reduce(function (result, item) {
          return result + item.total;
        }, 0)
    );
  };

  const calculateExpenses = () => {
    setExpenses(
      allInvoices
        .filter(
          (invoice) => invoice.type == "expense" && invoice.status == "paid"
        )
        .reduce(function (result, item) {
          return result + item.total;
        }, 0)
    );
  };

  const calculateProfits = () => {
    setProfits(revenue - expenses);
  };

  useEffect(() => {
    getInvoices();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    calculateRevenue();
    calculateExpenses();
    calculateProfits();
  }, [allInvoices]);

  if (!mounted) return;
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex w-full bg-neutral-900 h-20">
        <div className="container flex mx-auto h-full items-center">
          {/* Logo */}
          <div className="w-32 mr-6">
            <svg
              id="a448ed73-4e48-47cc-b76b-53b8ab0e5d49"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1550.18 421.19"
            >
              <defs></defs>
              <path
                style={{ fill: "#FFFFFF" }}
                d="M17,244.2H73c0,9.2,6.8,20,23.6,20,12.4,0,22.8-5.2,22.8-14,0-6-4.4-8.8-18.4-12l-24.4-6.4c-54.8-14.8-56.4-46-56.4-61.6,0-27.6,31.2-55.6,76.4-55.6,35.2,0,78,16.4,77.2,63.2h-56c0-12-8.4-17.6-20-17.6-10,0-18.4,4-18.4,12,0,7.2,6.4,11.2,16,13.6l32.4,8.8c46.8,12.8,50.8,42.4,50.8,55.2,0,41.2-42.8,59.6-80.4,59.6C56.6,309.4,17,286.6,17,244.2Z"
              />
              <path
                style={{ fill: "#FFFFFF" }}
                d="M408.4,211.8c0,60.4-44,97.2-90.8,97.2-19.2,0-44-7.2-57.6-24.4V397.79H200.8V119.4H260v20c13.6-17.6,38.4-24.8,57.6-24.8C364.4,114.6,408.4,151.8,408.4,211.8Zm-60,0c0-23.6-20-42-43.2-42-22.8,0-43.2,18-43.2,42,0,24.4,20.8,42.4,43.2,42.4C328.4,254.2,348.4,235.8,348.4,211.8Z"
              />
              <path
                style={{ fill: "#FFFFFF" }}
                d="M727.4,119.4V52.2H668.2v67.2h-34v44.4h34v42L727.4,265V163.8h39.2V119.4Z"
              />
              <path style={{ fill: "#FFFFFF" }} d="M792,21h59.2V305.8H792Z" />
              <path
                style={{ fill: "#FFFFFF" }}
                d="M873.59,56.6c0-19.6,16.8-34.4,36.8-34.4s36,14.8,36,34.4c0,18.8-16,34.4-36,34.4S873.59,75.4,873.59,56.6Zm7.2,62.8H940V305.8h-59.2Z"
              />
              <path
                style={{ fill: "#FFFFFF" }}
                d="M1172.39,119.4v162c0,79.19-41.6,118.79-109.2,118.79-42.4,0-78.4-24.4-93.2-59.59l48.8-19.6c6.8,15.2,24.8,27.6,44.4,27.6,30.8,0,50.4-17.2,50.4-60V285c-14,17.2-38.8,24.4-58,24.4-46.4,0-90.4-36.8-90.4-97.2s44-97.2,90.4-97.2c19.2,0,44,7.2,58,24.4v-20Zm-61.2,92.8c0-24-20.4-42-42.8-42-23.2,0-43.2,18.4-43.2,42s20,42,43.2,42C1091.19,254.2,1111.19,236.2,1111.19,212.2Z"
              />
              <path
                style={{ fill: "#FFFFFF" }}
                d="M1386.78,205.4V305.8h-59.19V212.2c0-28.8-17.6-39.6-32.4-39.6-16,0-36,8.4-36,39.6v93.6H1200V21h59.2V149c6.8-24,36.8-34.4,53.6-34.4C1362.39,114.6,1386.78,148.2,1386.78,205.4Z"
              />
              <path
                style={{ fill: "#FFFFFF" }}
                d="M1529.18,163.8H1490v142h-59.2v-142h-34V119.4h34V52.2H1490v67.2h39.2Z"
              />
              <path
                style={{ fill: "#f9d542" }}
                d="M525.54,114.46c-53.2,0-101.2,38.4-101.2,97.6,0,20.68,5.94,38.84,16,53.69q1.72,2.6,3.65,5.05a93.49,93.49,0,0,0,12,12.8c18.55,16.4,43.42,25.66,69.55,25.66,26.53,0,51.87-9.55,70.6-26.42A94.21,94.21,0,0,0,607,271.34q2.16-2.71,4.1-5.59c10.09-14.85,16.08-33,16.08-53.69C627.14,152.86,578.74,114.46,525.54,114.46Zm0,54.8c22.8,0,41.2,17.2,41.2,42.8s-18.4,42.4-41.2,42.4-41.2-16.8-41.2-42.4S502.74,169.26,525.54,169.26Z"
              />
              <polygon
                style={{ fill: "#FFFFFF" }}
                points="412.59 111.89 412.01 111.89 412.01 107.49 412.59 111.89"
              />
            </svg>
          </div>
        </div>
      </header>

      <main className="flex flex-1 bg-neutral-100 flex-col">
        <section className="container mx-auto flex flex-col py-12">
          <article className="flex w-full items-start gap-x-4 mb-12">
            {/* Title and Filter */}
            <div className="flex flex-col">
              <h1 className="text-4xl mb-4">Finance Tracker</h1>
              <div className="flex gap-x-3">
                <button className="rounded-md bg-neutral-800 border-2 border-neutral-800 text-white px-3 py-2 font-bold uppercase text-xs">
                  All
                </button>
                <button className="rounded-md border-2 border-neutral-300 text-neutral-500 px-3 py-2 font-bold uppercase text-xs">
                  Revenue
                </button>
                <button className="rounded-md border-2 border-neutral-300 text-neutral-500 px-3 py-2 font-bold uppercase text-xs">
                  Expense
                </button>
              </div>
            </div>

            {/* Revenue */}
            <div className="ml-auto p-8 bg-white rounded-lg shadow-sm flex flex-col w-56">
              <p className="text-xs uppercase font-bold">Revenue</p>
              <p className="text-3xl font-extrabold tracking-tight">
                ??{revenue.toFixed(2)}
              </p>
            </div>

            {/* Expenses */}
            <div className="p-8 bg-white rounded-lg shadow-sm flex flex-col w-56">
              <p className="text-xs uppercase font-bold">Expenses</p>
              <p className="text-3xl font-extrabold tracking-tight">
                ??{expenses.toFixed(2)}
              </p>
            </div>

            {/* Profit */}
            <div className="p-8 bg-white rounded-lg shadow-sm flex flex-col w-56">
              <p className="text-xs uppercase font-bold">Profits</p>
              <p className="text-3xl font-extrabold tracking-tight">
                ??{profits.toFixed(2)}
              </p>
            </div>
          </article>

          {/* Table Headers */}
          <article className="w-full flex p-3">
            <p className="font-bold text-xs w-[15%] uppercase">Date Created</p>
            <p className="font-bold text-xs w-[15%] uppercase">Client</p>
            <p className="font-bold text-xs w-[15%] uppercase">Total</p>
            <p className="font-bold text-xs w-[15%] uppercase">Type</p>
            <p className="font-bold text-xs w-[15%] uppercase">URL</p>
            <p className="font-bold text-xs w-[15%] uppercase">Date Due</p>
            <p className="font-bold text-xs w-28 uppercase ml-auto">Status</p>
          </article>

          {/* Loop through invoiceData */}
          <article className="w-full flex flex-col">
            {mounted &&
              allInvoices.map((invoice) => {
                return (
                  <article className=" bg-white p-3 shadow-sm rounded-md w-full items-center flex mb-2">
                    <p className="text-xs w-[15%]">
                      {format(new Date(invoice.date_created), "dd/MM/yyyy")}
                    </p>
                    <p className="text-xs w-[15%]">{invoice.client}</p>
                    <p className="text-xs w-[15%]">
                      <span className="text-xs text-neutral-400 font-bold mr-3">
                        ??
                      </span>
                      {invoice.total.toFixed(2)}
                    </p>
                    <p className="text-xs w-[15%]">
                      {" "}
                      {invoice.type[0].toUpperCase() +
                        invoice.type.substring(1)}
                    </p>
                    <p className="text-xs w-[15%]">
                      <a
                        className="flex"
                        href={invoice.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          ></path>
                        </svg>
                        Open in Google Sheets
                      </a>
                    </p>
                    <p className="text-xs w-[15%]">
                      {format(new Date(invoice.date_due), "dd/MM/yyyy")}
                    </p>
                    <div className="ml-auto w-28 flex items-center">
                      {invoice.status == "overdue" && (
                        <p className="w-full justify-center flex text-xs px-2.5 py-2 bg-red-400/10 text-red-600 uppercase font-bold rounded-lg">
                          {invoice.status[0].toUpperCase()}
                          {invoice.status.substring(1)}
                        </p>
                      )}

                      {invoice.status == "paid" && (
                        <p className="w-full justify-center flex text-xs px-2.5 py-2 bg-green-400/10 text-green-600 uppercase font-bold rounded-lg">
                          {invoice.status[0].toUpperCase()}
                          {invoice.status.substring(1)}
                        </p>
                      )}

                      {invoice.status == "outstanding" && (
                        <p className="w-full justify-center flex text-xs px-2.5 py-2 bg-orange-400/10 text-orange-600 uppercase font-bold rounded-lg">
                          {invoice.status[0].toUpperCase()}
                          {invoice.status.substring(1)}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
          </article>

          {/* {mounted && allInvoices ? <p>{JSON.stringify(allInvoices)}</p> : null} */}
        </section>
      </main>

      <footer className="flex"></footer>
    </div>
  );
}
