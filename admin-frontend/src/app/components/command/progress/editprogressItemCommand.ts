import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ProgressData } from '@/app/models/Progress';

const API_PROGRESS_URL = 'http://localhost:3000/progress';

export const useEditProgressCommand = (progressId: string, onClose: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ProgressData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await axios.patch(`${API_PROGRESS_URL}/${progressId}`, data);
      toast.success('Progress updated successfully');
      onClose();
      router.refresh();
    } catch (error) {
      toast.error('Error updating progress');
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
};
