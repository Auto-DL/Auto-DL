import { fireEvent, render, screen  } from "@testing-library/react";
import LoginForm from "../LoginForm";
import React from "react";



const mockLogin=(action)=>{
    
    if(action==="Invalid credentials"){
        return {
            type:"INVALID_CREDENTIALS",
            message:"Invalid credentials"
        }
    }

};


describe("loginForm", () => {
    test("username field should be in the document", () => {   

        const component=render(<LoginForm />);
        const usernameField=component.getByTestId("loginUsername");
        expect(usernameField).toBeInTheDocument();
       
    }   
);

test("password field should be in the document", () => {   
    const component=render(<LoginForm />);
    const passwordField=component.getByTestId("loginPassword");
    expect(passwordField).toBeInTheDocument();
   
})


test("username and password fields are empty initially", () => {   
    const component=render(<LoginForm />);
    const loginUsername=component.getByTestId("loginUsername");
    const loginPasswordField=component.getByTestId("loginPassword");

    const enteredUsername=loginUsername.childNodes[1].childNodes[0].value;
    const enteredPassword=loginPasswordField.childNodes[0].value;

    expect(enteredUsername).toBe("");
    expect(enteredPassword).toBe("");

})

test("email input should accept text", () => {   
    const component=render(<LoginForm />);
    const loginUsername=component.getByTestId("loginUsername");
    // console.log(loginUsername.childNodes[1].childNodes[0].value);
    fireEvent.change(loginUsername.childNodes[1].childNodes[0], {target:{value:"user23234"}});
    // console.log(loginUsername.childNodes[1].childNodes[0].value);
    expect(loginUsername.childNodes[1].childNodes[0].value).toBe("user23234")
   
})

test("password input should accept text", () => {   
    const component=render(<LoginForm />);
    const loginPasswordField=component.getByTestId("loginPassword");

    fireEvent.change(loginPasswordField.childNodes[0], {target:{value:"aosd3e4"}});
    expect(loginPasswordField.childNodes[0].value).toBe("aosd3e4")
   
})

test("submit button must be clickable", () => {   
  
    const component=render(<LoginForm  />);
    const loginButton=component.getByTestId("loginButton");

    fireEvent.click(loginButton);
    const warning=component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();

})

test("warning to fill all the details when username and password are both empty ", () => {   

    const component=render(<LoginForm />);
    const loginButton=component.getByTestId("loginButton");

    fireEvent.click(loginButton);
    const warning=component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();

})

test("warning to fill all the details when username is filled but password is empty ", () => {   
   
    const component=render(<LoginForm />);
    const loginButton=component.getByTestId("loginButton");
    const loginUsername=component.getByTestId("loginUsername");

    fireEvent.change(loginUsername.childNodes[1].childNodes[0], {target:{value:"user23234"}});
    fireEvent.click(loginButton);
    const warning=component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();

})

test("warning to fill all the details when password is filled but username is empty ", () => {   
    const component=render(<LoginForm />);
    const loginButton=component.getByTestId("loginButton");
    const loginPasswordField=component.getByTestId("loginPassword");

    fireEvent.change(loginPasswordField.childNodes[0], {target:{value:"aosd3e4"}});
    fireEvent.click(loginButton);

    const warning=component.getByText("Please fill all the details");
    // const warning=component.getByTestId("warning");
    expect(warning).toBeInTheDocument();

})


test("invalid credentials warning on invalid info details ", () => {   
    const component=render(<LoginForm/>);
    const loginButton=component.getByTestId("loginButton");
    const loginUsername=component.getByTestId("loginUsername");
    const loginPasswordField=component.getByTestId("loginPassword");

    fireEvent.change(loginUsername.childNodes[1].childNodes[0], {target:{value:"user23234"}});
    fireEvent.change(loginPasswordField.childNodes[0], {target:{value:"aosd3e4"}});
    console.log(loginUsername.childNodes[1].childNodes[0].value);
    console.log(loginPasswordField.childNodes[0].value);
    fireEvent.click(loginButton);


    const warning=component.getByTestId("warning");
    const passwordd=component.getByText("Login");
    expect(passwordd).toBeInTheDocument();
    

})




}
);

