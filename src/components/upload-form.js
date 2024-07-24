'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await axios.post('/api/upload_sample', formData);

      const data = response.data;

      if (data.status === 'ok') {
        router.push(`/status/${data.analysis_id}`);
      } else {
        setErrorMsg(data.msg);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="file" name="file" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      {errorMsg && <p>{errorMsg}</p>}
    </form>
  );
}
