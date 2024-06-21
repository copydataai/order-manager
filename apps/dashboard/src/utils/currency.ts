export const currencies = {
    USDollar: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }),
    Pounds: new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    }),
    Euro: new Intl.NumberFormat("en-DE", {
        style: "currency",
        currency: "EUR",
    }),
};
