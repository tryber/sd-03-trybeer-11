import React, { useState, useEffect } from 'react';
import { getUser, changeName } from '../../Services/apiUserRequests';
import { Loading, TopMenu } from '../../Components';
import './index.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState(null);
  const [changeLoading, setChangeLoading] = useState(false);
  const [oficialName, setOficialName] = useState('');

  useEffect(() => {
    if (loading) {
      getUser()
        .then((user) => {
          setOficialName(user.name);
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
        .then((res) => {
          setResult(res);
          setChangeLoading(false);
        })
        .catch((err) => {
          setError(err);
          setChangeLoading(false);
        });
    }
  }, [changeLoading, name]);

  if (changeLoading || loading) return <Loading />;

  const role = localStorage.getItem('role');

  return (
    <>
      <TopMenu />
      <div className="chage-user-container">
        <form
          aria-label="change name input"
          className="change-user-form"
          onSubmit={(e) => {
            e.preventDefault();
            setChangeLoading(true);
          }}
        >
          <label className="change-user-label" htmlFor="name">
            <h2 className="change-user-label-text">Name</h2>
            <textarea
              aria-label="change name"
              data-testid={role === 'administrator' ? "profile-name" : "profile-name-input"}
              className="change-user-input"
              onChange={(event) => setOficialName(event.target.value)}
              name="name"
              id="name"
              defaultValue={name}
              readOnly={role === "administrator"}
            />
          </label>
          <label className="change-user-label" htmlFor="email">
            <h2 className="change-user-label-text">Email</h2>
            <textarea
              aria-label="read email"
              data-testid={role === 'administrator' ? 'profile-email' : 'profile-email-input'}
              className="change-user-input"
              id="email"
              name="email"
              value={email}
              readOnly
            />
          </label>

          <button
            disabled={name === oficialName}
            data-testid="profile-save-btn"
            className="change-user-button"
            type="submit"
          >
            Salvar
          </button>
        </form>
        <div className="change-user-feedback">
          {error && <h2>{error}</h2>}
          {result && <h2>Atualização concluída com sucesso</h2>}
        </div>
      </div>
    </>
  );
};

export default Profile;
