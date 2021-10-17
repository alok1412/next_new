import { gql } from '@apollo/client';
import { getApolloClient } from '../utils'
import Layout from '../components/HomePage'
// import {useEffect, useState} from 'react'

export default function Home(props) {

  // const [profileData, setProfileData] = useState(props.profile)
  // const getProfile = async() => {
  // const GET_PROFILE = gql`{
  //   getProfile (account_id: "${process.env.GATSBY_ACCOUNT_ID}") {
  //     dev
  //   }
  // }`;
  // const { data } = await getApolloClient().query({query: GET_PROFILE})
  // const profil = JSON.parse(data.getProfile.dev);
  // return profil
  // }
  // useEffect(async() => {
  //   const data = getProfile()
  //   const dataShow = await data
  //   setProfileData(dataShow)
  // },[])
  return (
    <Layout profile={props.profile} />
  )
}

export const getStaticProps = async() => {

  const GET_PROFILE = gql`{
    getProfile (account_id: "${process.env.GATSBY_ACCOUNT_ID}") {
      dev
    }
  }`;
    
  const { data } = await getApolloClient().query({query: GET_PROFILE})
  const profile = JSON.parse(data.getProfile.dev);
  
  return { props : {
      profile
    },
    revalidate:1,
  };
}