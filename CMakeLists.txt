cmake_minimum_required ( VERSION 2.8.5 )
cmake_policy ( SET CMP0054 NEW )
project ( StageCast-Audience )

include ( etc/build_defs.cmake )
include ( etc/build_type.cmake )
include ( etc/cflags.cmake )
include ( etc/clang_format.cmake )
include ( etc/clang_tidy.cmake )

include ( etc/find_cryptopp.cmake )
include ( FindOpenSSL )

find_package ( yaml-cpp REQUIRED )

file ( GLOB AUDIENCE_SRC
    src/util/*
    src/net/*
    src/notifier/*
    src/abr/*
    src/media-server/*
)

include_directories (
    src/util
    src/net
    src/notifier
    src/abr
    src/media-server
)

include_directories( SYSTEM
    ${CryptoPP_INCLUDE_DIRS}
    third_party/json/single_include
)

add_library ( audience STATIC
    ${AUDIENCE_SRC}
)

set ( AUDIENCE_LIBS
    audience
    yaml-cpp
    ${CryptoPP_LIBRARIES}
    OpenSSL::SSL
    OpenSSL::Crypto
)

add_executable ( ws-media-server src/frontend/ws_media_server.cc )
target_link_libraries ( ws-media-server ${AUDIENCE_LIBS} )
