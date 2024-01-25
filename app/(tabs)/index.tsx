import * as React from 'react'

import { Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Lottie from "lottie-react-native";
import { createRandomUser } from '@/utils/generate-dummy-data';
import { ThreadsContext } from '@/context/thread-context';
import ThreadsItem from '@/components/ThreadsItem';

// const user = createRandomUser();

// // console.log(JSON.stringify(user, null, 2));

export default function TabOneScreen() {
  const animationRef= React.useRef<Lottie>(null);
  const threads = React.useContext(ThreadsContext);

  return (
    <SafeAreaView>
      <ScrollView
      contentContainerStyle={styles.scroll}
      refreshControl={
        <RefreshControl
        refreshing={false} 
        tintColor={"transparent"}
        onRefresh={() => { animationRef.current?.play() }}
        />
    }
      >
        <Lottie
        // Imperative API allowing us to manipulate component using the reference
        ref={animationRef}
        source={require("../../lottie-animations/threads.json")}
        loop={false}
        autoPlay
        style={styles.lottie}
        // onAnimationFinish={() => {
        //   alert("finished")
        // }}
        />
        {threads.map(thread => ( <ThreadsItem key={thread.id} {...thread} /> ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 90,
    height: 90,
    alignSelf: 'center'
  },
  scroll: {
    // backgroundColor: "grey",
    paddingHorizontal: 10,
    paddingTop: Platform.select({ android: 30 }),
  }
});
