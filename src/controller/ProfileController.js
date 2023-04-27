import { Profile } from "../model/ProfileModel.js";

const user = new Profile({
  uid: "1234",
  username: "john_doe",
  nationality: "USA",
  email: "john.doe@example.com",
  gender: "male",
  address: "123 Main St, Anytown USA",
  viewarray: [],
});
