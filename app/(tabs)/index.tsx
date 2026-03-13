import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InfluencerListScreen() {

  const [influencers, setInfluencers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20")
      .then((res) => res.json())
      .then((data) => {

        const formatted = data.results.map((item: any) => ({
          id: item.login.uuid,
          name: item.name.first + " " + item.name.last,
          city: item.location.city,
          image: item.picture.medium,
          followers: Math.floor(Math.random() * 100000),
          engagement: (Math.random() * 10).toFixed(2)
        }));

        setInfluencers(formatted);
      });
  }, []);

  const filteredInfluencers = influencers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.city.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/influencer/[id]",
            params: item
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.city}>{item.city}</Text>

          <View style={styles.statsRow}>
            <Text style={styles.stats}>👥 {item.followers}</Text>
            <Text style={styles.stats}>📈 {item.engagement}%</Text>
          </View>
        </View>

        <Ionicons
          name={favorites.includes(item.id) ? "star" : "star-outline"}
          size={24}
          color="gold"
          onPress={() => toggleFavorite(item.id)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Search influencer..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filteredInfluencers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 15
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd"
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15
  },

  infoContainer: {
    flex: 1
  },

  name: {
  fontSize: 17,
  fontWeight: "bold",
  textAlign: "left",
  writingDirection: "ltr"
},

city: {
  color: "#666",
  marginBottom: 5,
  textAlign: "left",
  writingDirection: "ltr"
},

  statsRow: {
    flexDirection: "row",
    gap: 15
  },

  stats: {
    fontSize: 13,
    color: "#444"
  }

});
