import React, { useState } from 'react';

const AccountSettings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    // Save the updated settings (e.g., API call to update the user information)
    console.log("Settings saved", { email, password });
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </label>
        <br />
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default AccountSettings;
