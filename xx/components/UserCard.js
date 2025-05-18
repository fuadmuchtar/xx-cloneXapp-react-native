import { Image, Text, TouchableOpacity, View } from "react-native";

export default function UserCard({ user }) {
    return (
        <View style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>Nama</Text>
                <Text style={{ color: '#657786' }}>@username</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#1DA1F2', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Follow</Text>
            </TouchableOpacity>
        </View>
    );
}