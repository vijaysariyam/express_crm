(exports.const1 = "test"), (exports.const12 = `test2`);

// let currencyID = null;
// it("POST /v1/currencies should return(200) and creates  new currency useful to candidate insert", async () => {
//   const currencyData = {
//     code: `U${randomNumber}${randomNumber}`,
//   };
//   await request(app)
//     .post("/v1/currencies")
//     .set("Authorization", `Bearer ${accessToken}`)
//     .set("Refresh", `Bearer ${refreshToken}`)
//     .send(currencyData)
//     .expect(200)
//     .then((response) => {
//       expect(response.body).toHaveProperty("id");
//       currencyID = response.body.id;
//     });
// });

// let addressID = null;
// it("POST /v1/addresses should return(200) and creates  new address useful to insert candidate", async () => {
//   const adressData = {
//     country: "country",
//     street_address: "street_address",
//     city: "city",
//     state: "state",
//     postal_code: "postal_code",
//   };
//   await request(app)
//     .post("/v1/addresses")
//     .set("Authorization", `Bearer ${accessToken}`)
//     .set("Refresh", `Bearer ${refreshToken}`)
//     .send(adressData)
//     .expect(200)
//     .then((response) => {
//       expect(response.body).toHaveProperty("id");
//       addressID = response.body.id;
//     });
// });
