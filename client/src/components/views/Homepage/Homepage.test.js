import React from "react";
import { shallow } from "enzyme";
import { HomepageComponent } from ".";

const mockProps = {
  products: [
    {
      id: "sg634673eb",
      name: "Lorem ipsum",
    },
  ],
  loading: {
    active: false,
  },
  loadProducts: () => { },
};

describe("Component Homepage", () => {
  it("should render without crashing", () => {
    const component = shallow(<HomepageComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
