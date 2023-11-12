import { Given, When, Then } from "@cucumber/cucumber";

Given("2I am doing this", async () => {
  console.log("hello world");
});
Given(`2I am logged in`, async () => {
  console.log("hello world");
});

When("2testing_when", async () => {
  console.log("hello world");
});

Then("2testing_then", async () => {
  console.log("hello world");
});
