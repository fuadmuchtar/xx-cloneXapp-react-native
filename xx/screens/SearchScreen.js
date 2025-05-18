import React, { useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Feather, AntDesign } from '@expo/vector-icons';
import UserCard from "../components/UserCard";

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [trendingTopics, setTrendingTopics] = useState([
        {
            id: '1',
            category: 'Technology · Trending',
            title: 'React Native',
            tweetsCount: '45.2K',
        },
        {
            id: '2',
            category: 'Business & finance · Trending',
            title: 'Bitcoin',
            tweetsCount: '125K',
        },
        {
            id: '3',
            category: 'Politics · Trending',
            title: '#Election2024',
            tweetsCount: '87.5K',
        },
        {
            id: '4',
            category: 'Entertainment · Trending',
            title: 'New Movie Release',
            tweetsCount: '32.1K',
        },
        {
            id: '5',
            category: 'Sports · Trending',
            title: 'World Cup',
            tweetsCount: '212K',
        },
    ]);

    const [suggestedAccounts, setSuggestedAccounts] = useState([
        {
            id: '1',
            name: 'React Native',
            handle: '@reactnative',
            verified: true,
            avatar: 'https://reactnative.dev/img/header_logo.svg',
        },
        {
            id: '2',
            name: 'JavaScript',
            handle: '@javascript',
            verified: true,
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png',
        },
        {
            id: '3',
            name: 'Tech News',
            handle: '@technews',
            verified: false,
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
    ]);

    return (
        <View style={styles.container}>
            {/* Search Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>
                <View style={styles.searchInputContainer}>
                    <Feather name="search" size={20} color="#657786" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search X"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity>
                    <Feather name="settings" size={22} color="#1DA1F2" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {/* buat card, berisi avatar, dan sebelah kanannya, nama lalu dibawahnya username */}
                <UserCard></UserCard>




                {/* For You Section */}
                {/* <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trends for you</Text>

                    {trendingTopics.map(topic => (
                        <TouchableOpacity key={topic.id} style={styles.trendingItem}>
                            <View>
                                <Text style={styles.trendingCategory}>{topic.category}</Text>
                                <Text style={styles.trendingTitle}>{topic.title}</Text>
                                <Text style={styles.trendingCount}>{topic.tweetsCount} posts</Text>
                            </View>
                            <TouchableOpacity>
                                <Feather name="more-horizontal" size={16} color="#657786" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.showMore}>
                        <Text style={styles.showMoreText}>Show more</Text>
                    </TouchableOpacity>
                </View> */}

                {/* Who to Follow Section */}
                {/* <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Who to follow</Text>

                    {suggestedAccounts.map(account => (
                        <TouchableOpacity key={account.id} style={styles.accountItem}>
                            <Image source={{ uri: account.avatar }} style={styles.accountAvatar} />
                            <View style={styles.accountInfo}>
                                <View style={styles.accountNameContainer}>
                                    <Text style={styles.accountName}>{account.name}</Text>
                                    {account.verified && (
                                        <AntDesign name="checkcircle" size={14} color="#1DA1F2" style={styles.verifiedIcon} />
                                    )}
                                </View>
                                <Text style={styles.accountHandle}>{account.handle}</Text>
                            </View>
                            <TouchableOpacity style={styles.followButton}>
                                <Text style={styles.followButtonText}>Follow</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.showMore}>
                        <Text style={styles.showMoreText}>Show more</Text>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>

            {/* Bottom Navigation */}
            {/* <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Feather name="home" size={26} color="#657786" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Feather name="search" size={26} color="#1DA1F2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Feather name="bell" size={26} color="#657786" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Feather name="mail" size={26} color="#657786" />
                </TouchableOpacity>
            </View> */}
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
        borderBottomWidth: 0.5,
        borderBottomColor: '#E1E8ED',
    },
    profilePic: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF3F4',
        borderRadius: 20,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    content: {
        flex: 1,
    },
    section: {
        paddingTop: 15,
        borderBottomWidth: 10,
        borderBottomColor: '#EFF3F4',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    trendingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    trendingCategory: {
        fontSize: 13,
        color: '#657786',
    },
    trendingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 2,
    },
    trendingCount: {
        fontSize: 13,
        color: '#657786',
    },
    showMore: {
        padding: 15,
    },
    showMoreText: {
        color: '#1DA1F2',
    },
    accountItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    accountAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    accountInfo: {
        flex: 1,
        marginLeft: 10,
    },
    accountNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    verifiedIcon: {
        marginLeft: 3,
    },
    accountHandle: {
        fontSize: 14,
        color: '#657786',
    },
    followButton: {
        backgroundColor: '#000',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    followButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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