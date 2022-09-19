import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard'

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';
import { useState } from 'react';

interface Props extends ModalProps {
    discord: string,
    onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopying, setIsCopying] = useState(false)

    async function handleCopyDiscordToClipBoard() {
        setIsCopying(true)
        await Clipboard.setStringAsync(discord)
        setIsCopying(false)
        Alert.alert('Discord copiado', 'ID copiado para a área de transferência do dispositivo')
    }

    return (
        <Modal transparent statusBarTranslucent {...rest} animationType="fade">
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon} disabled={isCopying}>
                        <MaterialIcons
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_400}
                        />
                    </TouchableOpacity>
                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight={'bold'} />
                    <Heading title="Let's play!" subtitle="Agora é só começar a jogar!" style={{ alignItems: 'center', marginTop: 24 }} />
                    <Text style={styles.label}>Adicione no discord</Text>
                    <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordToClipBoard}>
                        <Text style={styles.discord}>
                            {isCopying? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}