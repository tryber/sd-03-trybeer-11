import React, { useState, useEffect } from 'react';
import './index.css';

import { getUser, changeName } from '../../Services/apiUserRequests';
import { Redirect } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [changeLoading, setChangeLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || {};

    if (!token) setShouldRedirect(true);

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
      setResult(null);
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

  if (shouldRedirect) return <Redirect to="/login" />
  if (changeLoading || loading) return <h1>Loading</h1>;

  return (
    <div className="chage-user-container">
      <h1 data-testid="top-title" className="change-user-title">
        Profile
      </h1>
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
            data-testid="profile-name-input"
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
            data-testid="profile-email-input"
            className="change-user-input"
            type="email"
            id="email"
            name="email"
            value={email}
            readOnly
          />
        </label>

        <button
          data-testid="profile-save-btn"
          className="change-user-button"
          type="submit"
        >
          Salvar
        </button>
      </form>
      <div className="change-user-feedback">
        {error && <h2>{error}</h2>}
        {result && <h2>Nome alterado para: {result.name}</h2>}
      </div>
    </div>
  );
};

export default Profile;
