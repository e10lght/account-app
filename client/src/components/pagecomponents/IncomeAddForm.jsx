import React from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { incomeAddReducer } from '../../store/incomeAddReducer';
import dayjs from 'dayjs';
import { Header } from '../Header';

export const IncomeAddForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({});
  const [addResult, setAddResult] = useState(false);
  const [showFormsNumber, setShowFormsNumber] = useState(1);

  const onSubmit = (data) => {
    dispatch(incomeAddReducer(data))
      .then((response) => response.payload)
      .then((response) => {
        setAddResult(response.message);
        setTimeout(() => {
          setAddResult(false);
        }, 3000);
      });
  };

  const addIncomeForm = () => {
    setShowFormsNumber((prev) => prev + 1);
  };

  const reduceSpendForm = () => {
    const w = watch();
    let keys = Object.keys(w);
    let lastKey = keys[keys.length - 1];
    delete w[lastKey];
    reset(w);
    setShowFormsNumber((prev) => prev - 1);
  };

  return (
    <>
      <Header />
      <Card style={{ margin: 10 }}>
        <Box p={5}>
          <h2>収入レコード追加</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              {[...Array(showFormsNumber)].map((_, index) => (
                <>
                  <Grid container item xs={12}>
                    <Grid item xs={6}>
                      no.{index + 1}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: 'end',
                      }}
                    >
                      {showFormsNumber > 1 && index > 0 && (
                        <Button
                          startIcon={<DeleteForeverIcon />}
                          style={{
                            color: 'red',
                          }}
                          onClick={reduceSpendForm}
                        ></Button>
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={8}>
                    <TextField
                      {...register(`${index}.incomeTitle`, {
                        required: true,
                      })}
                      label="収入タイトル"
                      fullWidth
                      placeholder="プレースホルダー"
                    />
                    {errors.incomeTitle && (
                      <span
                        style={{
                          color: 'red',
                        }}
                      >
                        必須項目です
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      {...register(`${index}.incomeCategoryId`, {
                        required: true,
                      })}
                      label="収入カテゴリ"
                      fullWidth
                      id="select"
                      select
                    >
                      <MenuItem value="1">給料</MenuItem>
                      <MenuItem value="2">お小遣い</MenuItem>
                      <MenuItem value="3">選択肢3</MenuItem>
                    </TextField>
                    {errors.incomeCategoryId && (
                      <span
                        style={{
                          color: 'red',
                        }}
                      >
                        必須項目です
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      {...register(`${index}.incomeAmount`, {
                        required: true,
                      })}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      label="収入金額"
                      fullWidth
                      placeholder="プレースホルダー"
                    />
                    {errors.incomeAmount && (
                      <span
                        style={{
                          color: 'red',
                        }}
                      >
                        必須項目です
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      {...register(`${index}.recievedDate`, {
                        required: true,
                      })}
                      type="date"
                      fullWidth
                      defaultValue={dayjs().format('YYYY-MM-DD')}
                    />
                    {errors.recievedDate && (
                      <span
                        style={{
                          color: 'red',
                        }}
                      >
                        必須項目です
                      </span>
                    )}
                  </Grid>
                  <input
                    type="hidden"
                    defaultValue={1}
                    {...register(`${index}.userId`, { required: true })}
                  />
                </>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  style={{
                    width: '100%',
                    border: '1px dashed',
                  }}
                  onClick={addIncomeForm}
                >
                  追加する
                </Button>
              </Grid>

              <Grid item xs={4}>
                <Button variant="contained" color="primary" type="submit">
                  登録
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        {addResult && (
          <Alert severity="success" color="info">
            {addResult}
          </Alert>
        )}
      </Card>
    </>
  );
};
