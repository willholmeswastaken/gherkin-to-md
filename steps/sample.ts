import { Given, When, Then } from "@cucumber/cucumber";

Given("I am doing this", async () => {
  console.log("hello world");
});
Given(`I am logged in`, async () => {
  console.log("hello world");
});

When("testing_when", async () => {
  console.log("hello world");
});

Then("testing_then", async () => {
  console.log("hello world");
});
