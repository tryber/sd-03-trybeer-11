import { useState, useEffect } from 'react';

const useRequisition = (requisition) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (loading) {
      requisition()
        .then(setInfo)
        .catch(({ message }) => setError(message));
    }

    setLoading(false);
  }, [loading, requisition]);

  return [{ loading, error, info }, { setLoading, setError, setInfo }];
};

export default useRequisition;
