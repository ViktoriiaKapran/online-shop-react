import React from "react";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { useGetUserByIdQuery } from "../store/api";

const ShowUserName = () => {
  const token = useSelector(state => state.auth.token);
  const id = useSelector(state => state?.auth?.payload?.sub?.id);
  const {data} = useGetUserByIdQuery(id);

  return (
    <>
      {token ? <Box>Hello, {data?.UserFindOne?.nick ? data?.UserFindOne?.nick : data?.UserFindOne?.login}</Box> : <></>}
    </>

  )
}
export default ShowUserName;