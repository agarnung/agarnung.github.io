QT += core widgets gui datavisualization

CONFIG += c++20

TEMPLATE = app

SOURCES += \
        main.cpp \

DISTFILES += \
        README.md

CONFIG += link_pkgconfig
PKGCONFIG += fftw3

INCLUDEPATH += /home/alejandro/Escritorio/proyectos/dsi/cvlibrary

USE_QWT=no
LIB_DEPENDENCIES += DsiXml DsiQtd DsiData DsiLog DsiMisc DsiQtUtils DsiMisc DsiLog DsiNumericalRecipes DsiCv
include ($(DSILIBS_SRC_PATH)/dsilibs.pri)

QMAKE_CXXFLAGS += -O3 -march=native -funroll-loops -fomit-frame-pointer # Flags de compilador para mejorar eficiencia de código máquina vectorizando operaciones
