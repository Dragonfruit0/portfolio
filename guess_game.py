import random
import time

def print_colored(text, color_code):
    """Print colored text in terminal"""
    print(f"\033[{color_code}m{text}\033[0m")

def print_header():
    """Print game header with ASCII art"""
    print_colored("""
    ╔══════════════════════════════════════════════════════════════╗
    ║                    🎮 NUMBER GUESSING GAME 🎮                ║
    ║                                                              ║
    ║  Welcome to the ultimate number guessing challenge!         ║
    ║  Can you guess the secret number between 1 and 100?         ║
    ╚══════════════════════════════════════════════════════════════╝
    """, "36")  # Cyan color

def get_player_name():
    """Get player name with validation"""
    while True:
        name = input("\n🎯 Enter your name: ").strip()
        if name and len(name) <= 20:
            return name
        print_colored("❌ Please enter a valid name (1-20 characters)", "31")

def display_rules():
    """Display game rules"""
    print_colored("\n📋 GAME RULES:", "33")
    print_colored("• I'll think of a number between 1 and 100", "37")
    print_colored("• You have unlimited attempts to guess it", "37")
    print_colored("• I'll give you hints after each guess", "37")
    print_colored("• Try to guess in as few attempts as possible!", "37")
    print_colored("• Type 'quit' to exit the game", "31")

def get_guess(attempt):
    """Get and validate player guess"""
    while True:
        try:
            guess_input = input(f"\n🎲 Attempt #{attempt}: Enter your guess (1-100): ").strip().lower()
            
            if guess_input == 'quit':
                return 'quit'
            
            guess = int(guess_input)
            if 1 <= guess <= 100:
                return guess
            else:
                print_colored("❌ Please enter a number between 1 and 100!", "31")
        except ValueError:
            print_colored("❌ Please enter a valid number!", "31")

def give_hint(guess, secret_number):
    """Give helpful hints based on the guess"""
    difference = abs(guess - secret_number)
    
    if guess < secret_number:
        if difference <= 5:
            print_colored("🔥 Very close! Try a higher number", "33")
        elif difference <= 15:
            print_colored("📈 Higher! You're getting warmer", "33")
        else:
            print_colored("⬆️  Much higher!", "33")
    else:
        if difference <= 5:
            print_colored("🔥 Very close! Try a lower number", "33")
        elif difference <= 15:
            print_colored("📉 Lower! You're getting warmer", "33")
        else:
            print_colored("⬇️  Much lower!", "33")

def calculate_score(attempts):
    """Calculate score based on number of attempts"""
    if attempts <= 5:
        return 100
    elif attempts <= 10:
        return 80
    elif attempts <= 15:
        return 60
    elif attempts <= 20:
        return 40
    else:
        return 20

def display_result(attempts, secret_number, player_name):
    """Display game result with score"""
    score = calculate_score(attempts)
    
    print_colored("\n" + "="*60, "36")
    print_colored(f"🎉 CONGRATULATIONS {player_name.upper()}! 🎉", "32")
    print_colored("="*60, "36")
    print_colored(f"🎯 You guessed the number {secret_number} correctly!", "32")
    print_colored(f"📊 Attempts: {attempts}", "37")
    print_colored(f"🏆 Score: {score}/100", "33")
    
    if score == 100:
        print_colored("🌟 PERFECT SCORE! You're a guessing master!", "35")
    elif score >= 80:
        print_colored("⭐ Excellent! Great job!", "35")
    elif score >= 60:
        print_colored("👍 Good work! Keep practicing!", "35")
    else:
        print_colored("💪 Nice try! Better luck next time!", "35")

def play_again():
    """Ask if player wants to play again"""
    while True:
        choice = input("\n🔄 Would you like to play again? (y/n): ").strip().lower()
        if choice in ['y', 'yes']:
            return True
        elif choice in ['n', 'no']:
            return False
        else:
            print_colored("❌ Please enter 'y' or 'n'", "31")

def main():
    """Main game function"""
    print_header()
    
    player_name = get_player_name()
    print_colored(f"\n👋 Welcome, {player_name}! Let's play!", "32")
    
    display_rules()
    
    total_games = 0
    total_score = 0
    
    while True:
        total_games += 1
        print_colored(f"\n🎮 GAME #{total_games}", "36")
        print_colored("="*40, "36")
        
        # Generate secret number
        secret_number = random.randint(1, 100)
        attempts = 0
        
        print_colored("🤔 I'm thinking of a number...", "37")
        time.sleep(1)
        print_colored("✨ Ready! Start guessing!", "32")
        
        # Game loop
        while True:
            attempts += 1
            guess = get_guess(attempts)
            
            if guess == 'quit':
                print_colored(f"\n👋 Thanks for playing, {player_name}! The number was {secret_number}", "33")
                break
            
            if guess == secret_number:
                display_result(attempts, secret_number, player_name)
                score = calculate_score(attempts)
                total_score += score
                break
            else:
                give_hint(guess, secret_number)
        
        if guess == 'quit':
            break
            
        if not play_again():
            break
    
    # Final statistics
    if total_games > 1:
        avg_score = total_score / total_games
        print_colored("\n" + "="*50, "36")
        print_colored("📈 FINAL STATISTICS", "33")
        print_colored("="*50, "36")
        print_colored(f"🎮 Total Games: {total_games}", "37")
        print_colored(f"🏆 Total Score: {total_score}", "37")
        print_colored(f"📊 Average Score: {avg_score:.1f}/100", "37")
        
        if avg_score >= 80:
            print_colored("🌟 You're a guessing champion!", "35")
        elif avg_score >= 60:
            print_colored("⭐ You're getting really good at this!", "35")
        else:
            print_colored("💪 Keep practicing, you'll get better!", "35")
    
    print_colored(f"\n👋 Thanks for playing, {player_name}! Come back soon!", "32")
    print_colored("🎮 Game created by ProCoder09", "36")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print_colored("\n\n👋 Game interrupted. Thanks for playing!", "33")
    except Exception as e:
        print_colored(f"\n❌ An error occurred: {e}", "31")
        print_colored("Please try running the game again.", "31") 