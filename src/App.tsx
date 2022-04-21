import { Grid, Box, Stack, InputBase, Button, Input } from "@mui/material";
import React, { ReactFragment, useState } from "react";
import "./App.css";
interface JsonDatatype {
  data: string;
}

const App = () => {
  const [data, setData] = useState<Array<number>>([]);
  const [values, setValues] = useState<Array<number>>([0, 0, 0, 0]);

  const mean = (data: Array<number>): number => {
    let sum = 0;
    let len = data.length;
    for (let i = 0; i < len; i++) {
      sum = sum + data[i];
    }
    return sum / len;
  };

  const median = (data: Array<number>): number => {
    let len = data.length;
    let mid = Math.floor(len / 2);
    let middleNo = data.sort((a, b) => a - b);
    if (len % 2 === 0) {
      return (middleNo[mid - 1] + middleNo[mid]) / 2;
    } else {
      return middleNo[mid];
    }
  };

  const standardDeviation = (data: Array<number>): number => {
    let len = data.length;
    let meanValue = mean(data);
    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum = sum + Math.pow(data[i] - meanValue, 2);
    }
    return Math.sqrt(sum / len);
  };

  const mode = (data: Array<number>): number => {
    let len = data.length;
    let mode = data[0];
    let maxCount = 1;
    for (let i = 0; i < len; i++) {
      let count = 0;
      for (let j = 0; j < len; j++) {
        if (data[i] === data[j]) {
          count++;
        }
      }
      if (count > maxCount) {
        maxCount = count;
        mode = data[i];
      }
    }
    return mode;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (!e.target.files) return;
    const file: File = e.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let numbers: JsonDatatype = JSON.parse(JSON.stringify(reader.result));
      console.log(numbers.data.split(","));
      setData(numbers.data.split(",").map((x) => parseInt(x)));
    };
    setValues([mean(data), median(data), standardDeviation(data), mode(data)]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setData([...data, parseInt(e.target.value, 10)]);
    setValues([mean(data), median(data), standardDeviation(data), mode(data)]);
  };

  return (
    <Stack>
      <Grid container justifyContent='center' sx={{ p: 2 }} spacing={8}>
        <Grid item>
          <Box>
            <InputBase
              placeholder='Add number to the list'
              type='number'
              sx={{
                py: 2,
                px: 3,
                mx: 2,
                borderRadius: "20px",
                border: "1px solid black",
              }}
              onChange={handleChange}
            />
            <Button variant='contained' sx={{ py: 2, px: 3 }}>
              {" "}
              Add
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Input
              type='file'
              sx={{ py: 2, px: 3, mx: 2 }}
              onChange={handleFileChange}
            />
            <Button variant='contained' sx={{ py: 2, px: 3 }}>
              {" "}
              Input
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Stack justifyContent='center' className='tableContainer'>
        <Grid container justifyContent={"center"} className='table'>
          <Grid item xs={6} sm={4}>
            Mean
          </Grid>
          <Grid item xs={6} sm={4}>
            {values[0]}
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"} className='table'>
          <Grid item xs={6} sm={4}>
            Median
          </Grid>
          <Grid item xs={6} sm={4}>
            {values[1]}
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"} className='table'>
          <Grid item xs={6} sm={4}>
            Standard Deviation
          </Grid>
          <Grid item xs={6} sm={4}>
            {values[2]}
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"} className='table'>
          <Grid item xs={6} sm={4}>
            Mode
          </Grid>
          <Grid item xs={6} sm={4}>
            {values[3]}
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default App;
