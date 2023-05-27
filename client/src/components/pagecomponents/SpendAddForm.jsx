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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { spendAddReducer } from '../../store/spendAddReducer';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import dayjs from 'dayjs';

export const SpendAddForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addResult, setAddResult] = useState(false);
  const [showFormsNumber, setShowFormsNumber] = useState(1);

  const onSubmit = (data) => {
    dispatch(spendAddReducer(data))
      .then((response) => response.payload)
      .then((response) => {
        setAddResult(response.message);
        setTimeout(() => {
          setAddResult(false);
        }, 3000);
      });
  };
  const addSpendForm = () => {
    setShowFormsNumber((prev) => prev + 1);
  };
  const reduceSpendForm = () => {
    setShowFormsNumber((prev) => prev - 1);
  };

  return (
    <>
      <Card style={{ margin: 10 }}>
        <Box p={5}>
          <h2>支出レコード追加</h2>
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
                      {...register(`${index}spendTitle`, {
                        required: true,
                      })}
                      label="支出タイトル"
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
                      {...register(`${index}spendCategoryId`, {
                        required: true,
                      })}
                      label="支出カテゴリ"
                      fullWidth
                      id="select"
                      select
                    >
                      <MenuItem value="1">コンビニ</MenuItem>
                      <MenuItem value="2">家賃</MenuItem>
                      <MenuItem value="3">水道ガス光熱費</MenuItem>
                      <MenuItem value="4">携帯代</MenuItem>
                      <MenuItem value="5">クレジットカード</MenuItem>
                      <MenuItem value="6">交通費</MenuItem>
                      <MenuItem value="7">現金</MenuItem>
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
                      {...register(`${index}spendAmount`, {
                        required: true,
                      })}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      label="支出金額"
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
                  onClick={addSpendForm}
                >
                  追加する
                </Button>
              </Grid>

              <input
                type="hidden"
                defaultValue={1}
                {...register('itme.userId', { required: true })}
              />

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
