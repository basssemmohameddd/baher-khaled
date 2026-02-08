import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      Alert.alert('تنبيه', 'الرجاء كتابة وصف للصورة');
      return;
    }

    setLoading(true);
    
    try {
      // رابط صورة تجريبية للبدء
      const imageUrl = `https://picsum.photos/400/400?random=${Date.now()}&grayscale`;
      setImage(imageUrl);
      
      // إضافة للسجل
      setHistory(prev => [{
        id: Date.now(),
        prompt,
        image: imageUrl,
        date: new Date().toLocaleTimeString(),
      }, ...prev.slice(0, 4)]);
      
      Alert.alert('نجاح', 'تم إنشاء الصورة بنجاح!');
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ في الإنشاء');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setImage(null);
    setPrompt('');
    Alert.alert('تم', 'تم مسح كل شيء');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* الهيدر */}
        <View style={styles.header}>
          <Text style={styles.title}>🎨 منشئ الصور بالذكاء الاصطناعي</Text>
          <Text style={styles.subtitle}>أنشئ صوراً مذهلة بنقرة واحدة</Text>
        </View>

        {/* إدخال النص */}
        <View style={styles.card}>
          <Text style={styles.label}>✍️ اكتب وصف الصورة:</Text>
          <TextInput
            style={styles.input}
            placeholder="مثال: منظر غروب الشمس على جبال ثلجية"
            placeholderTextColor="#999"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* أزرار التحكم */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={generateImage}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>✨ إنشاء صورة</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={clearAll}
          >
            <Text style={styles.buttonText}>🗑️ مسح الكل</Text>
          </TouchableOpacity>
        </View>

        {/* الصورة الناتجة */}
        {image && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>🖼️ صورتك الجديدة:</Text>
            <Image 
              source={{ uri: image }} 
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.imageActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>💾 حفظ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>🔄 إعادة توليد</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>📤 مشاركة</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* السجل */}
        {history.length > 0 && (
          <View style={styles.historyCard}>
            <Text style={styles.historyTitle}>📜 السجل الحديث:</Text>
            {history.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <Text style={styles.historyPrompt}>{item.prompt}</Text>
                <Text style={styles.historyTime}>{item.date}</Text>
              </View>
            ))}
          </View>
        )}

        {/* الميزات القادمة */}
        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>🚀 الميزات القادمة:</Text>
          <View style={styles.featuresList}>
            <Text style={styles.feature}>• توليد فيديو من النص</Text>
            <Text style={styles.feature}>• رفع جودة الصور</Text>
            <Text style={styles.feature}>• قوالب جاهزة</Text>
            <Text style={styles.feature}>• تعديل بالذكاء الاصطناعي</Text>
            <Text style={styles.feature}>• دعم Hugging Face API</Text>
          </View>
        </View>

        {/* الفوتر */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AI Creator - مجاني بالكامل</Text>
          <Text style={styles.footerSubtext}>الإصدار 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#6C5CE7',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 10,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fbfbfb',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#00b894',
  },
  secondaryButton: {
    backgroundColor: '#fd79a8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  historyCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 15,
  },
  historyItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
    paddingVertical: 12,
  },
  historyPrompt: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 4,
    textAlign: 'right',
  },
  historyTime: {
    fontSize: 12,
    color: '#b2bec3',
    textAlign: 'left',
  },
  featuresCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 15,
    textAlign: 'right',
  },
  featuresList: {
    paddingRight: 10,
  },
  feature: {
    fontSize: 15,
    color: '#636e72',
    marginBottom: 8,
    textAlign: 'right',
  },
  footer: {
    backgroundColor: '#2d3436',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  footerSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
});