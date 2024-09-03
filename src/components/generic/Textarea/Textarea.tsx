import React, { useState, ChangeEvent } from 'react';
import styles from './Textarea.module.css'

interface IProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: object;
  testId?: string;
}

export function Textarea({ value, onChange, placeholder, style = {}, testId = '' }: IProps) {
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={handleChange}
      style={style}
      placeholder={placeholder}
      data-testid={testId}
    />
  );
}