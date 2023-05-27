import { Card, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IncomeTable } from '../IncomeTable';
import { SpendTable } from '../SpendTable';

export const Report = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tableFlag, setTableFlag] = useState(0);

  const onChangeReport = (data) => {
    const flag = Number(data.target.value);
    setTableFlag(flag);
  };
  return (
    <>
      <Card style={{ margin: 10 }}>
        <TextField
          {...register('spendCategoryId', { required: true })}
          label="収入・支出"
          id="select"
          select
          sx={{
            display: 'flex',
            maxWidth: 160,
            margin: 2,
          }}
          onChange={onChangeReport}
          value={tableFlag}
        >
          <MenuItem value="0">月次の支出</MenuItem>
          <MenuItem value="1">月次の収入</MenuItem>
        </TextField>
        {tableFlag === 1 && <IncomeTable />}
        {tableFlag === 0 && <SpendTable />}
      </Card>
    </>
  );
};
