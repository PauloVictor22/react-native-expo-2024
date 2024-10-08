import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
    const [page, setPage] = useState(0);

    const onPageSelected = (e) => {
        setPage(e.nativeEvent.position);
    };


    return (
        <View style={styles.container}>
            <PagerView initialPage={0} style={styles.content} onPageSelected={onPageSelected}>
                <View key="1" style={styles.page}>
                    <Image source={require("../../assets/img/fernando.jpg")} />
                    <Text style={styles.text}>Banner1</Text>
                </View>
                <View key="2" style={styles.page}>
                    <Image source={require("../../assets/img/vegetavasco.png")} />
                    <Text style={styles.text}>Banner 2</Text>
                </View>
                <View key="3" style={styles.page}>
                    <Image source={require("../../assets/img/gojira.jpg")} />
                    <Text style={styles.text}>Banner 3</Text>
                </View>
            </PagerView>
            <View style={styles.bulletContent}>
                <View style={[styles.bullet, page === 0 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 1 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 2 && styles.activeBullet]}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
    },
    content: {
        width: '100%',
        marginTop: 10,
        height: 190,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ADD8E6',
        height: 240,
        borderRadius: 10,
    },
    bullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 10,
        backgroundColor: '#999',
    },
    bulletContent: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    activeBullet: {
        backgroundColor: '#333',
    },
    text: {
        fontSize: 20,
        fontFamily: 'bold',
    },
});
