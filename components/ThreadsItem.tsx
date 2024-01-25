import * as React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { Thread } from "@/types/threads";
import { Text } from "./Themed";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { timeAgo } from "@/utils/time-ago";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ThreadsItem(thread: Thread): JSX.Element {
  return (
    <View style={styles.container}>
      <PostLeftSide {...thread} />

      <View style={styles.postCard}>
        <PostHeading
          name={thread.author.name}
          createdAt={thread.createdAt}
          verified={thread.author.verified}
        />

        <Text>{thread.content}</Text>

        {thread.image && (
          <Image
            source={thread.image}
            style={styles.expoImage}
            placeholder={blurhash}
            contentFit="cover"
            transition={200}
          />
        )}

        <BottomIcons />

        <PostFooter replies={thread.repliesCount} likes={thread.likesCount} />
      </View>
    </View>
  );
}

function PostHeading({
  name,
  createdAt,
  verified,
}: {
  name: string;
  createdAt: string;
  verified: boolean;
}) {
  return (
    <View style={styles.postHeading}>
      <View style={styles.postView}>
        <Text style={styles.verifiedText}>{name}</Text>
        {/* Conditional Rendering */}
        {verified && (
          <MaterialIcons name="verified" size={14} color="#60a5fa" />
        )}
      </View>

      <View style={styles.postView}>
        <Text style={styles.featherText}>{timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
}

function PostFooter({ replies, likes }: { replies: number; likes: number }) {
  return (
    <Text>
      {replies} replies · {likes} likes
    </Text>
  );
}

function BottomIcons() {
  const iconSize = 20;
  const currentTheme = useColorScheme();
  const iconColor = currentTheme === "dark" ? "white" : "black";

  return (
    <View style={styles.bottomIcons}>
      <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
      <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor} />
      <AntDesign name="retweet" size={iconSize} color={iconColor} />
      <Feather name="send" size={iconSize} color={iconColor} />
    </View>
  );
}

function PostLeftSide(thread: Thread) {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === "light" ? "#00000020" : "#ffffff20";

  return (
    <View style={styles.postLeftSide}>
      <Image
        source={thread.author.photo}
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={200}
      />

      <View style={{
        borderWidth: 1,
        alignSelf: 'center',
        borderColor,
        flexGrow: 1,
      }} />

      <View 
      style={styles.repliedUsers}
      >
      {[1, 2, 3].map((index) => (
        <Image
          key={index}
          // @ts-ignore
          source={thread.replies[index - 1]?.author.photo}
          style={{ width: index * 9, height: index * 9, borderRadius: 15 }}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
      ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  container: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 30,
  },
  expoImage: {
    width: "100%",
    minHeight: 300,
    borderRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  repliedUsers: {
    width: 20,
    alignItems: "center",
    alignSelf: "center",
    gap: 3,
  },
  postCard: {
    gap: 6,
    flexShrink: 1,
  },
  postFooterText: {
    color: "gray",
  },
  postHeading: {
    flexDirection: "row",
    alignItems: "center", // secondary axis
    justifyContent: "space-between",
    flexGrow: 1,
  },
  postLeftSide: {
    justifyContent: "space-between",
  },
  postView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  verifiedText: {
    fontWeight: "500",
  },
  featherText: {
    color: "gray",
  },
});
