import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../utils/rockets";
import axios from "axios";

export function GithubSuccess(props) {

  // auth.setUser();
  return (
    <div>
      <h1>Github success page</h1>
    </div>
  );
}