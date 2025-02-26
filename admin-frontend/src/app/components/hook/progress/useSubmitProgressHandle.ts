import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { ProgressData } from '@/app/models/Progress';

const API_PROGRESS_URL = 'http://localhost:3000/progress';

const useSubmitProgress = (onClose: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ProgressData, reset: () => void) =>  {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(API_PROGRESS_URL, data);

      if (response.status === 200 || response.status === 201) {
        toast.success('Tiến độ đã được tạo thành công');
        reset();
        mutate(API_PROGRESS_URL);
        onClose();
      }
    } catch (error) {
      toast.error('Lỗi khi tạo tiến độ');
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, onSubmit };
};

export default useSubmitProgress;
