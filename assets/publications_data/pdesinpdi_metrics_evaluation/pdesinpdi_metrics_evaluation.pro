QT += core widgets gui datavisualization

CONFIG += c++20

TEMPLATE = app

SOURCES += \
        main.cpp \

DISTFILES += \
        README.md

CONFIG += link_pkgconfig
PKGCONFIG += fftw3

QMAKE_CXXFLAGS += -O3 -march=native -funroll-loops -fomit-frame-pointer # Flags de compilador para mejorar eficiencia de código máquina vectorizando operaciones
