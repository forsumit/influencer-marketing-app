import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function InfluencerDetailScreen() {

  const { id, name, city, followers, engagement }: any = useLocalSearchParams();

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Influencer Detail</Text>

      <View style={styles.profileCard}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.info}>📍 {city}</Text>
        <Text style={styles.info}>👥 Followers: {followers}</Text>
        <Text style={styles.info}>📊 Engagement: {engagement}%</Text>
      </View>

      <Text style={styles.subtitle}>Recent Campaigns</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postBody}>{item.body}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f4f8"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15
  },

  profileCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },

  info: {
    fontSize: 14,
    marginTop: 4
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  postCard: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },

  postTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5
  },

  postBody: {
    color: "#555",
    lineHeight: 20
  }

});
