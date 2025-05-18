import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ProfileScreen({ navigation }) {
    // Sample profile data
    const [profile, setProfile] = useState({
        name: 'John Doe',
        handle: '@johndoe',
        bio: 'React Native Developer | Coffee Enthusiast | Dog Lover',
        location: 'San Francisco, CA',
        website: 'johndoe.dev',
        joinDate: 'Joined March 2019',
        following: 245,
        followers: 587,
        coverPhoto: 'https://images.unsplash.com/photo-1557683316-973673baf926',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    });

    // Sample tweets for this profile
    const [tweets, setTweets] = useState([
        {
            id: '1',
            time: '2h',
            content: 'Just learned React Native, and it\'s amazing! #reactnative #javascript',
            likes: 25,
            retweets: 5,
            comments: 3,
        },
        {
            id: '2',
            time: '1d',
            content: 'Working on a new project. Stay tuned for updates!',
            likes: 42,
            retweets: 8,
            comments: 6,
        },
        {
            id: '3',
            time: '3d',
            content: 'Beautiful day for a hike! #nature #weekend',
            likes: 87,
            retweets: 12,
            comments: 9,
        },
    ]);

    // For tab switching
    const [activeTab, setActiveTab] = useState('posts');

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>{profile.name}</Text>
                    <Text style={styles.tweetCount}>{tweets.length} Posts</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Cover Photo */}
                <View style={styles.coverPhotoContainer}>
                    <Image
                        source={{ uri: profile.coverPhoto }}
                        style={styles.coverPhoto}
                    />
                </View>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: profile.avatar }}
                            style={styles.profileImage}
                        />
                    </View>

                    {/* <TouchableOpacity style={styles.editProfileButton}>
                        <Text style={styles.editProfileText}>Edit profile</Text>
                    </TouchableOpacity> */}

                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{profile.name}</Text>
                        <Text style={styles.profileHandle}>{profile.handle}</Text>
                        <Text style={styles.profileBio}>{profile.bio}</Text>

                        <View style={styles.profileDetails}>
                            <View style={styles.profileDetail}>
                                <Feather name="map-pin" size={16} color="#657786" />
                                <Text style={styles.detailText}>{profile.location}</Text>
                            </View>

                            <View style={styles.profileDetail}>
                                <Feather name="link" size={16} color="#657786" />
                                <Text style={[styles.detailText, styles.linkText]}>{profile.website}</Text>
                            </View>

                            <View style={styles.profileDetail}>
                                <Feather name="calendar" size={16} color="#657786" />
                                <Text style={styles.detailText}>{profile.joinDate}</Text>
                            </View>
                        </View>

                        <View style={styles.followStats}>
                            <TouchableOpacity style={styles.followStat}>
                                <Text style={styles.followCount}>{profile.following}</Text>
                                <Text style={styles.followLabel}>Following</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.followStat}>
                                <Text style={styles.followCount}>{profile.followers}</Text>
                                <Text style={styles.followLabel}>Followers</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Tab Navigation */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
                        onPress={() => setActiveTab('posts')}
                    >
                        <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>Posts</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={[styles.tab, activeTab === 'replies' && styles.activeTab]}
                        onPress={() => setActiveTab('replies')}
                    >
                        <Text style={[styles.tabText, activeTab === 'replies' && styles.activeTabText]}>Replies</Text>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity
                        style={[styles.tab, activeTab === 'media' && styles.activeTab]}
                        onPress={() => setActiveTab('media')}
                    >
                        <Text style={[styles.tabText, activeTab === 'media' && styles.activeTabText]}>Media</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
                        onPress={() => setActiveTab('likes')}
                    >
                        <Text style={[styles.tabText, activeTab === 'likes' && styles.activeTabText]}>Likes</Text>
                    </TouchableOpacity> */}
                </View>

                {/* Tweets */}
                {tweets.map(tweet => (
                    <View key={tweet.id} style={styles.tweet}>
                        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
                        <View style={styles.tweetContent}>
                            <View style={styles.tweetHeader}>
                                <Text style={styles.name}>{profile.name}</Text>
                                <Text style={styles.handle}>{profile.handle}</Text>
                                <Text style={styles.time}>· {tweet.time}</Text>
                            </View>
                            <Text style={styles.tweetText}>{tweet.content}</Text>
                            <View style={styles.tweetActions}>
                                <TouchableOpacity style={styles.action}>
                                    <Feather name="message-circle" size={18} color="#657786" />
                                    <Text style={styles.actionText}>{tweet.comments}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.action}>
                                    <AntDesign name="retweet" size={18} color="#657786" />
                                    <Text style={styles.actionText}>{tweet.retweets}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.action}>
                                    <AntDesign name="hearto" size={18} color="#657786" />
                                    <Text style={styles.actionText}>{tweet.likes}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.action}>
                                    <Feather name="share" size={18} color="#657786" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Floating Tweet Button */}
            <TouchableOpacity style={styles.floatingButton}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Feather name="home" size={26} color="#657786" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Feather name="search" size={26} color="#657786" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Feather name="bell" size={26} color="#657786" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Feather name="mail" size={26} color="#657786" />
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
        paddingHorizontal: 15,
        paddingTop: 40,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    tweetCount: {
        fontSize: 14,
        color: '#657786',
        marginLeft: 15,
    },
    scrollView: {
        flex: 1,
    },
    coverPhotoContainer: {
        height: 150,
    },
    coverPhoto: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileSection: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E1E8ED',
    },
    profileImageContainer: {
        marginTop: -40,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#fff',
        width: 80,
        height: 80,
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    editProfileButton: {
        position: 'absolute',
        right: 15,
        top: 10,
        borderWidth: 1,
        borderColor: '#1DA1F2',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 15,
    },
    editProfileText: {
        color: '#1DA1F2',
        fontWeight: 'bold',
    },
    profileInfo: {
        marginTop: 10,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileHandle: {
        fontSize: 16,
        color: '#657786',
        marginBottom: 10,
    },
    profileBio: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 10,
    },
    profileDetails: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    profileDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailText: {
        color: '#657786',
        marginLeft: 5,
    },
    linkText: {
        color: '#1DA1F2',
    },
    followStats: {
        flexDirection: 'row',
        marginTop: 5,
    },
    followStat: {
        flexDirection: 'row',
        marginRight: 20,
    },
    followCount: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    followLabel: {
        color: '#657786',
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E1E8ED',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#1DA1F2',
    },
    tabText: {
        color: '#657786',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#1DA1F2',
        fontWeight: 'bold',
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
    floatingButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
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