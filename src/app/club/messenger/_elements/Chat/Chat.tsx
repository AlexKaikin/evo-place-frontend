'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import cn from 'classnames'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Typography } from '@/ui'
import defaultAvatar from '@assets/img/user/defaultAvatar.png'
import { useAuth, useMessages } from '@store'
import { socket } from '@utils'
import { NewMessageForm } from '../NewMessageForm/NewMessageForm'
import styles from './Chat.module.css'

export function Chat() {
  return (
    <div className={styles.chat}>
      <Messages />
      <NewMessageForm />
    </div>
  )
}

export function Messages() {
  const { userId, roomId, messages, setMessage, getMore, pagination, loading } =
    useMessages()
  const { user: myProfile } = useAuth()
  const scrollToBottomChatRef = useRef<HTMLDivElement | null>(null)
  const [isScrollActive, setIsScrollActive] = useState(true)
  const [isMoreMessage, setIsMoreMessage] = useState(false)
  const { ref, inView } = useInView({ threshold: 0 })
  const dates = messages.reduce<(number | null)[]>(
    (result, message, index, arr) => {
      let item
      if (index === 0) {
        item = message.date
      } else {
        item =
          dayjs(+message.date).format('D MMMM YYYY') ===
          dayjs(+arr[index - 1].date).format('D MMMM YYYY')
            ? null
            : message.date
      }
      result.push(item)
      return result
    },
    []
  )

  function scrollHandler(e: { currentTarget: HTMLDivElement }) {
    const chatMessages = e.currentTarget
    const isScrolled =
      Math.abs(
        chatMessages.scrollHeight -
          chatMessages.scrollTop -
          chatMessages.clientHeight
      ) < 50

    if (isScrolled) {
      if (!isScrollActive) {
        setIsScrollActive(true)
      }
    } else {
      if (isScrollActive) {
        setIsScrollActive(false)
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsMoreMessage(true)
    }, 1000)
  }, [])

  useEffect(() => {
    if (inView && pagination._page < pagination.pagesCount && !loading) {
      //   setMessagesPage(pagination._page + 1)
      getMore(userId!)

      setIsMoreMessage(false)

      setTimeout(() => {
        setIsMoreMessage(true)
      }, 1000)

      //   const fetchData = async () => {
      //     const beforeMessages: any = await getMore(user._id)
      //     beforeMessages && setMessages([...beforeMessages, ...messages])
      //   }

      //fetchData()
    }
  }, [
    getMore,
    inView,
    loading,
    pagination._page,
    pagination.pagesCount,
    userId,
  ])

  useEffect(() => {
    isScrollActive &&
      scrollToBottomChatRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
  }, [isScrollActive, messages])

  useEffect(() => {
    roomId &&
      socket.on(roomId, data => {
        setMessage([...messages, data])
      })
  }, [roomId, messages, setMessage])

  return (
    <div className={styles.wrapper} onScroll={scrollHandler}>
      <div className={styles.shadow}></div>
      <div className={styles.messages}>
        {isMoreMessage && <div ref={ref} className={styles.more}></div>}
        {userId ? null : <div className={styles.select}>Select chat</div>}
        {messages.map((message, index) => (
          <div key={message.id} className={styles.message}>
            {dates[index] ? (
              <div className={styles.date}>
                <Typography variant="tooltip">
                  {dayjs(+message.date).format('D MMMM YYYY')}
                </Typography>
              </div>
            ) : null}
            <div className={styles.card}>
              <div className={styles.avatar}>
                <Image
                  fill
                  src={
                    message?.user.avatarUrl
                      ? message.user.avatarUrl
                      : defaultAvatar
                  }
                  alt="avatar"
                />
              </div>
              <div
                className={cn(styles.content, {
                  sender: message.user.fullName !== myProfile?.fullName,
                })}
              >
                <div className={styles.header}>
                  <div className={styles.name}>{message.user.fullName}</div>
                  <div className={styles.time}>
                    <Typography variant="tooltip">
                      {dayjs(+message.date).format('H:mm')}
                    </Typography>
                  </div>
                </div>
                <div>
                  {message.text.split('\n').map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollToBottomChatRef}></div>
      </div>
    </div>
  )
}
