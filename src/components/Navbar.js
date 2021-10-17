import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router'
import createImageUrl from '../utils/createImageUrl'
import downloadResume from '../utils/downloadResume'
import {useState,useEffect} from 'react'
// import { gql } from '@apollo/client';
// import { getApolloClient } from '../utils'


const Navbar = (props) => {
  // const [articlesData, setArticleData] = useState(!!props.profile?props.profile.articles:[])
  // const [resumeData, setResumeData] = useState(!!props.profile?props.profile.assets:[])
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
  //   setArticleData(dataShow.articles)
  //   setResumeData(dataShow.assets)
  // },[])
  //
  // console.log(props);
  const profile = !!props.profile
  const articlesAvailble = profile?props.profile.articles.length:false;
  const key = profile?props.profile.assets.filter(asset => (asset.type == "primary")).length >= 1:""
  const validKey = key?props.profile.assets.filter(asset => (asset.type == "primary"))[0].url:""
  const url = key?createImageUrl(validKey):"/images/frame-logo.svg";
  const resumeKey = profile?props.profile.assets.filter(asset => (asset.type == "resume")).length >= 1:""
  const resumeValidKey = resumeKey?props.profile.assets.filter(asset => (asset.type == "resume"))[0].url:""
  const resumeUrl = key?createImageUrl(resumeValidKey):"/images/frame-logo.svg";
  const name = profile?`${props.profile.first_name} ${props.profile.last_name}`:""
  // const prepareString = s => s.replace(/<[\w]+>|<\/[\w]+>/g, "").trim().slice(0,50)
  // const about = profile?!!props.profile.about?prepareString(props.profile.about):"":""
  const about = profile?!!props.profile.intro[0]?props.profile.intro[0].content:"":""
  const facebook_url =profile?
                      !!props.profile.socials.filter(item => item.type=="Facebook")[0]
                      ?props.profile.socials.filter(item => item.type=="Facebook")[0].url
                      :""
                      :""
  const twitter_url = profile?
                      !!props.profile.socials.filter(item => item.type=="Twitter")[0]
                      ?props.profile.socials.filter(item => item.type=="Twitter")[0].url
                      :""
                      :""
  const linkedin_url = profile?
                      !!props.profile.socials.filter(item => item.type=="LinkedIn")[0]
                      ?props.profile.socials.filter(item => item.type=="LinkedIn")[0].url
                      :""
                      :""
  const github_url = profile?
                      !!props.profile.socials.filter(item => item.type=="GitHub")[0]
                      ?props.profile.socials.filter(item => item.type=="GitHub")[0].url
                      :""
                      :""
  const instagram_url = profile?
                      !!props.profile.socials.filter(item => item.type=="Instagram")[0]
                      ?props.profile.socials.filter(item => item.type=="Instagram")[0].url
                      :""
                      :""
  const medium_url = profile?
                      !!props.profile.socials.filter(item => item.type=="Medium")[0]
                      ?props.profile.socials.filter(item => item.type=="Medium")[0].url
                      :""
                      :""
  const issuu_url =profile?
                      !!props.profile.socials.filter(item => item.type=="Issuu")[0]
                      ?props.profile.socials.filter(item => item.type=="Issuu")[0].url
                      :""
                      :""

  const router = useRouter()
  const [navState, setNavState] = useState("close")
  const changeNavState = () => {
    let state = navState === "close" ? "open" : "close"
    setNavState(state) 
  }
  const [resumeUri, SetResumeUri] = useState('');
  useEffect(async () => {
    const url = await downloadResume(resumeUrl);
    SetResumeUri(url);
  }, []);

  return(
    <nav className="site-navigation">
      <div className="site-nav-wrap">
        <div className="nav-left">
          {(router.pathname === "/articles" && (
            <div className="nav-profile">
              <div className="nav-profile-photo">
                <Image quality='100' height='64px' width='64px' src={url} alt="profile-photo" />
              </div>
              <div className="info">
                <p>{name}</p>
                <p style={{marginTop: '5px'}}>{about.slice(0,30)}</p>
                <div className="social-icons" style={{marginTop: '5px'}}>
                  {facebook_url && (
                    <a href={facebook_url} target="_blank" rel="noopener" aria-label="link to my facebook profile">
                      <span className="facebook-icon"></span>
                    </a>
                  )}
                  {twitter_url && (
                    <a href={twitter_url} target="_blank" rel="noopener" aria-label="link to my twitter profile">
                      <span className="twitter-icon"></span>
                    </a>
                  )}
                  {linkedin_url && (
                    <a href={linkedin_url} target="_blank" rel="noopener"  aria-label="link to my linkedin profile">
                      <span className="linkedin-icon"></span>
                    </a>
                  )}
                  {instagram_url && (
                    <a href={instagram_url} target="_blank" rel="noopener"  aria-label="link to my instagram profile">
                      <span className="instagram-icon"></span>
                    </a>
                  )}
                  {github_url && (
                    <a href={github_url} target="_blank" rel="noopener" aria-label="link to my github profile">
                      <span className="github-icon"></span>
                    </a>
                  )}
                  {medium_url && (
                    <a href={medium_url} target="_blank" rel="noopener" aria-label="link to my medium profile">
                      <span className="medium-icon"></span>
                    </a>
                  )}
                  {issuu_url && (
                    <a href={issuu_url} target="_blank" rel="noopener" aria-label="link to my issuu profile">
                      <span className="issuu-icon"></span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))|| (
          <div className="nav-icon">
            <img src="/images/frame-dark-logo.svg" alt="frame_logo" key="frame-dark-logo"></img>
          </div>
          )}    
        </div>
        <div className="nav-right">
          <div className={`hamburger ${navState}`} onClick={() => changeNavState()}>
            <div className={`line-1 ${navState}`}></div>
            <div className={`line-2 ${navState}`}></div>
            <div className={`line-3 ${navState}`}></div>
          </div>
          <ul className="nav-list">
              <Link href='/'>
                  <li className={`nav-item ${router.pathname == "/" ? "active" : ""}`}>
                  About
                  </li>
              </Link>
              {!!articlesAvailble && (
                <Link href='/articles'>
                  <li className={`nav-item ${router.pathname == "/articles" ? "active" : ""}`}>
                  Articles
                  </li>
                </Link>
              )}
              {profile && (
                <li className='nav-item'>
                  <a href={resumeUri} target="_blank" style={{textDecoration: 'none' ,color: '#e5e5e5'}}>
                    Resume
                  </a>
                </li>
              )}
          </ul>
        </div>
      </div>
      <div className={`nav-list-mobile ${navState}`}>
        <ul>
          <Link href='/'>
              <li 
              className={`nav-item ${router.pathname == "/" ? "active" : ""}`}
              onClick={() => changeNavState()}>
              About
              </li>
          </Link>
          {!!articlesAvailble && (
            <Link href='/articles'>
              <li 
              className={`nav-item ${router.pathname == "/articles" ? "active" : ""}`}
              onClick={() => changeNavState()}>
              Articles
              </li>
            </Link>
          )}
          {profile && (
            <li  className='nav-item'>
              <a href={resumeUri} target="_blank" style={{textDecoration: 'none', fontWeight:'normal', color: '#e5e5e5'}}>
              Resume
            </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

