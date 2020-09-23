import React, { useState, useEffect } from 'react';
import './index.css';

import { getUser, changeName } from '../../Services/apiUserRequests';

const Profile = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changeLoading, setChangeLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      getUser()
        .then((user) => {
          setName(user.name);
          setEmail(user.email);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [loading]);

  useEffect(() => {
    if (changeLoading) {
      changeName(name)
        .then((result) => {
          setResult(result);
          setChangeLoading(false);
        })
        .catch((err) => {
          setError(err);
          setChangeLoading(false);
        });
    }
  }, [changeLoading, name]);

  if (changeLoading || loading) return <h1>Loading</h1>;

  return (
    <div className="chage-user-container">
      <h1 className="change-user-title">Profile</h1>
      <form
        className="change-user-form"
        onSubmit={(e) => {
          e.preventDefault();
          setChangeLoading(true);
        }}
      >
        <label className="change-user-label" htmlFor="name">
          <h2 className="change-user-label-text">Name</h2>
          <input
            className="change-user-input"
            name="name"
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label className="change-user-label" htmlFor="email">
          <h2 className="change-user-label-text">Email</h2>
          <input
            className="change-user-input"
            type="email"
            id="email"
            name="email"
            value={email}
            readOnly
          />
        </label>

        <button className="change-user-button" type="submit">Change Name</button>
      </form>
      <div className="change-user-feedback">
        {error && <h2>{error}</h2>}
      </div>
    </div>
  );
};

export default Profile;
