import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
//internal components
import Header from 'modules/pages/user-profile/Header';
import CardTopic from 'common/card/CardTopic';
import CardUniversity from 'common/card/CardHome';
import TabPanel, { a11yProps } from 'common/tabs/TabPanel';
//internal modules
import { pageTransition } from 'common/page-transition/configVarian';
import { userProfileQueries } from 'query/user-profile';
//material-ui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { useTheme, makeStyles } from '@material-ui/core/styles';
//multiple i18n
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FullWidthTabs() {
  //STATE
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const idUser = useSelector((state) => state.login.data.id);
  //get topic individual
  const { data, loading, error } = useQuery(
    userProfileQueries.GET_PERONAL_TOPIC,
    {
      variables: {
        id: idUser,
      },
    }
  );
  //get Favourite university which was marked by user
  const {
    data: dataFavourite,
    loading: loadingFavourite,
    error: errorFavourite,
  } = useQuery(userProfileQueries.GET_FAVOURITE_UNIVERSITY, {
    variables: {
      idUser: idUser,
    },
  });

  //METHOD
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      className="user"
    >
      <Header />
      <div className="container main-user">
        <div className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label={t('userProfile.tab.myPost')}
              {...a11yProps(0)} // option, it's helpful for SEO
            />
            <Tab label={t('userProfile.tab.favoritePost')} {...a11yProps(1)} />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} //option, it's helpful for SEO
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {/* this tab show personal topic */}
            <TabPanel className="tab-personal-topic" value={value} index={0}>
              {!!data &&
                data.allTopics.map((post, index) => (
                  <CardTopic key={index} {...post} />
                ))}
            </TabPanel>
            {/* this tab show university which marked */}
            <TabPanel value={value} index={1}>
              {!!dataFavourite &&
                dataFavourite.Account.favouriteUniversity.map(
                  (university, index) => (
                    <CardUniversity key={index} {...university} />
                  )
                )}
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
    </motion.div>
  );
}
