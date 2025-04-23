#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

#define F_CPU 16000000UL

#define LED_VERDE PC0
#define LED_ROJO PC1
#define BOTON PD0

volatile uint8_t usar_verde = 1; // 1 = parpadea el verde, 0 = parpadea el rojo

ISR(PCINT2_vect) {
    // Anti-rebote: verificar que esté presionado y esperar liberación
    if (!(PIND & (1 << BOTON))) {
        _delay_ms(20);
        if (!(PIND & (1 << BOTON))) {
            usar_verde ^= 1; // Cambiar cuál LED parpadea
            // Esperar a que se suelte el botón
            while (!(PIND & (1 << BOTON)));
            _delay_ms(20);
        }
    }
}

void setup() {
    // LEDS como salida
    DDRC |= (1 << LED_VERDE) | (1 << LED_ROJO);
    PORTC &= ~((1 << LED_VERDE) | (1 << LED_ROJO)); // Apagar ambos

    // Botón como entrada con pull-up
    DDRD &= ~(1 << BOTON);
    PORTD |= (1 << BOTON);

    // Configurar interrupción en PD0
    PCICR |= (1 << PCIE2);       // Habilitar PCINT para PORTD
    PCMSK2 |= (1 << PCINT16);    // Habilitar PCINT en PD0

    sei(); // Habilitar interrupciones globales
}

int main(void) {
    setup();

    while (1) {
        if (usar_verde) {
            // Parpadea solo el verde rápido
            PORTC ^= (1 << LED_VERDE);
            PORTC &= ~(1 << LED_ROJO); // Asegurar rojo apagado
            _delay_ms(100);
        } else {
            // Parpadea solo el rojo lento
            PORTC ^= (1 << LED_ROJO);
            PORTC &= ~(1 << LED_VERDE); // Asegurar verde apagado
            _delay_ms(500);
        }
    }

    return 0;
}
