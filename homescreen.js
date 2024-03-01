import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  Linking,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper"; // Import IconButton
import { emergencyLocations } from "./emergancylocations";
import headerlogo from "./assets/HeaderLogo.png"

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    const foundServices = [];
    for (const category in emergencyLocations) {
      if (typeof emergencyLocations[category] === "string") {
        if (
          emergencyLocations[category]
            .toLowerCase()
            .includes(location.toLowerCase())
        ) {
          foundServices.push({
            name: category,
            number: emergencyLocations[category],
          });
        }
      } else {
        const services = emergencyLocations[category].filter(
          (service) =>
            service.name.toLowerCase().includes(location.toLowerCase()) ||
            service.number.toLowerCase().includes(location.toLowerCase())
        );
        foundServices.push(...services);
      }
    }

    setResults(foundServices);
    setLoading(false);
  };

  const handleClear = () => {
    setLocation(""); // Clear the search query
    setResults([]); // Clear the results
  };

  return (
    <View style={styles.container}>
    <Image source={headerlogo} style={styles.logo}></Image>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Service Name or Number"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <IconButton
          style={{ marginTop: 10 }}
          icon="magnify" // Specify the icon you want to use
          onPress={handleSearch}
        />
      </View>
      <Button title="Clear" color={"black"} onPress={handleClear} />
      {loading && <Text>Loading...</Text>}
      <ScrollView style={styles.resultsContainer}>
        {results.map((service, index) => (
          <Button
            key={index}
            title={`${service.name}: ${service.number}`}
            onPress={() =>
              navigation.navigate("Number", {
                name: service.name,
                number: service.number,
              })
            }
          />
        ))}
      </ScrollView>
      <Text style={{top:50,fontSize:20,fontWeight:"bold",textAlign:"center"}}>What You All Need Is Here...</Text>
      <View style={styles.mostUsedContainer}>
        <View style={styles.column}>
          <MostUsedHelplineBox
            name="Police "
            number="100"
            imageSource={require("./assets/policehelp.png")}
          />

          <MostUsedHelplineBox
            name="fire"
            number="101"
            imageSource={require("./assets/firehelp.png")}
          />
          <MostUsedHelplineBox
            name="Cyber Crime Help "
            number="155620"
            color="#800080"
            imageSource={require("./assets/cybercrime.png")}
          />
          <MostUsedHelplineBox
            name="LPG Leak Helpline"
            number="1906"
            color="#800070"
            imageSource={require("./assets/lpghelp.png")}
          />
        </View>
        <View style={styles.column}>
          <MostUsedHelplineBox
            name="Ambulance"
            number="102"
            color="#FFD700"
            imageSource={require("./assets/Ambulance.png")}
          />
          <MostUsedHelplineBox
            name="Childern Helpline"
            number="1098"
            color="#008000"
            imageSource={require("./assets/childhelp.png")}
          />
          <MostUsedHelplineBox
            name="Women Helpline"
            number="1091"
            color="#800080"
            imageSource={require("./assets/womenhelp.png")}
          />
          <MostUsedHelplineBox
            name="National Emergency Helpline"
            imageSource={require("./assets/nationhelp.png")}
            number="112"
            color="#800080"
          />
        </View>
        {/* Add more columns with three MostUsedHelplineBox components for other helplines */}
      </View>
    </View>
  );
};

const MostUsedHelplineBox = ({ name, number, imageSource,boxImage }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <TouchableOpacity onPress={handleCall}>
      <View style={styles.boxContainer}>
        <Image source={imageSource} style={styles.boxImage} />
      </View>
      <TouchableOpacity onPress={handleCall}>
        <Text style={styles.getHelpButton}>Get Help</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6E6FA",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 20,
    marginRight: -50,
  },
  resultsContainer: {
    width: "100%",
    padding:10,
  },

  mostUsedContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow items to wrap to the next line
    justifyContent: "space-between",
    paddingTop: 70,
  },
  column: {
    width: "100%", // Each column takes the full width
    flexDirection: "row", // Arrange items horizontally
    justifyContent: "space-between", // Distribute items evenly
    marginBottom: 30,
  },
  boxContainer: {
    width: "85%", // Each box takes up 33.33% of the column width
    borderRadius: 5,
    alignItems: "center",
  },
  boxImage: {
    width: 80, // Adjust the width as needed
    height: 80, // Adjust the height as needed
    borderRadius: 10,
    marginBottom: 10,
  },
  boxTitle: {
    fontWeight: "bold",
  },
  boxNumber: {
    marginTop: 5,
  },
  logo: {
    marginTop: 10,
    width: 300, // Adjust width as needed
    height: 200, // Adjust height as needed
  },
  getHelpButton: {
    height: 40,
    width: 70,
    fontSize: 12,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    color: "black",
    backgroundColor: "#F8F7FF",
    textAlign: "center",
  },
});

export default HomeScreen;
