import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import TweetScreen from "./TweetScreen";
import { useNavigation } from "@react-navigation/native";
import Tweet from "../components/Tweet";
import { gql, useQuery } from "@apollo/client";

const GET_TWEETS = gql`
  query Tweets {
  posts {
    content
    # tags
    # imgUrl
    # authorId
    comments {
      content
    }
    likes {
        username
    }
    createdAt
    updatedAt
    # commentsUser {
    #   name
    # }
    # likesUser {
    #   name
    # }
    authorDetail {
      name
      username
    }
    _id
  }
}

`;

export default function HomeScreen() {
    const { data, loading, error } = useQuery(GET_TWEETS);

    const { navigate } = useNavigation();

    // console.log(data?.posts[1].comments)


    // Function to navigate to profile with user data
    // const navigateToProfile = (userData) => {
    //     navigate("Profile", { userData });
    // };
    const navigateToProfile = (userData) => {
        navigate("Profile");
    };

    // Header user data
    const headerUser = {
        name: 'My Profile',
        handle: '@myprofile',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }
    console.log("data", data);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigateToProfile(headerUser)}>
                    <Image
                        source={{ uri: headerUser.avatar }}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>XX</Text>
                <Feather name="settings" size={22} color="#1DA1F2" />
            </View>

            <ScrollView
                style={styles.feed}
                contentContainerStyle={{ paddingBottom: 80 }}
            >
                {data?.posts.map((tweet, idx) => (
                    <Tweet key={idx} tweet={tweet} />
                ))}
            </ScrollView>

            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.tweetButton} onPress={() => navigate("Tweet")}>
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 40,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E1E8ED',
    },
    profilePic: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    feed: {
        flex: 1,
    },
    tweet: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E1E8ED',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    tweetContent: {
        flex: 1,
    },
    tweetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    name: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    handle: {
        color: '#657786',
        marginRight: 5,
    },
    time: {
        color: '#657786',
    },
    tweetText: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 10,
    },
    tweetActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 40,
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        marginLeft: 5,
        color: '#657786',
        fontSize: 12,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        // left: 0,
        // alignItems: 'center',
    },
    tweetButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1DA1F2',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    bottomNav: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: '#E1E8ED',
        paddingVertical: 10,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
});